import {
  BN,
  Address,
  AnchorProvider,
  Program,
  translateAddress,
  Wallet,
  ProgramAccount,
} from "@project-serum/anchor";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  Cluster,
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  Keypair,
} from "@solana/web3.js";
import bs58 from 'bs58';

import {
  ParclV2Core,
  IDL as PARCL_V2_CORE_IDL,
  OpenPositionIxParams,
  OpenPositionTxParams,
  AllocatePositionIxParams,
  ClosePositionIxParams,
  ExecuteTradeTxParams,
  DeallocatePositionIxParams,
  Position,
} from "./types";
import {
  getStatePda,
  getUnsettledCollateralVaultPda,
  getLiquidityTokenMintPda,
  getLiquidityTokenVaultPda,
  getCollateralVaultPda,
  getProtocolFeeVaultPda,
  getUnsettledCollateralAccountPda,
  getPositionPda,
} from "./utils";

const PROGRAM_ID = "pAMMTYk2C9tAxenepGk8a1bi9JQtUdnzu3UAh7NxYcW";

export class ParclV2Client {
  program: Program<ParclV2Core>;
  wallet: Wallet;

  constructor(program: Program<ParclV2Core>, wallet: Wallet) {
    this.program = program;
    this.wallet = wallet;
  }

  static load(): ParclV2Client {
    const rpcUrl =
      process.env.RPC_ENDPOINT ?? clusterApiUrl((process.env.CLUSTER ?? "devnet") as Cluster);
    const connection = new Connection(rpcUrl);
    const keypair = Keypair.fromSecretKey(bs58.decode(process.env.WALLET_PRIVATE_KEY!));
    const wallet = new Wallet(keypair);
    const program = new Program<ParclV2Core>(
      PARCL_V2_CORE_IDL,
      PROGRAM_ID,
      new AnchorProvider(connection, wallet, {})
    );
    return new ParclV2Client(program, wallet);
  }

  ///////////////////////////
  /// TRANSACTION GETTERS ///
  ///////////////////////////

  async getOpenPositionTx({
    direction,
    leverage,
    amount,
    unsettledAmount,
    pool,
    position,
    priceFeed,
    collateralMint,
    owner,
  }: OpenPositionTxParams): Promise<Transaction> {
    const params = {
      direction,
      leverage,
      amount,
      unsettledAmount,
      maxSkewImpactFee: amount.add(unsettledAmount),
    };
    const tx = new Transaction();
    const collateralSource = getAssociatedTokenAddressSync(
      translateAddress(collateralMint),
      translateAddress(owner)
    );
    const collateralSourceInfo = await this.program.provider.connection.getAccountInfo(
      collateralSource
    );
    if (collateralSourceInfo === null) {
      throw new Error("Collateral source account is not initialized");
    }
    if (amount.add(unsettledAmount).isZero()) {
      throw new Error("Amount and unsettled amount cannot both be zero");
    }
    const [unsettledCollateralAccount] = getUnsettledCollateralAccountPda(
      owner,
      this.program.programId
    );
    const unsettledCollateralAccountInfo = await this.program.provider.connection.getAccountInfo(
      unsettledCollateralAccount
    );
    if (unsettledCollateralAccountInfo === null) {
      const createUnsettledCollateralAccountIx = await this.getCreateUnsettledCollateralAccountIx(
        owner
      );
      tx.add(createUnsettledCollateralAccountIx);
    }
    const { id } = await this.getPositions(owner, pool);
    const allocatePositionIx = await this.getAllocatePositionIx({
      id,
      pool,
      position,
      owner,
    });
    tx.add(allocatePositionIx);
    const openPositionIx = await this.getOpenPositionIx({
      params,
      pool,
      position,
      priceFeed,
      collateralMint,
      owner,
      collateralSource,
    });
    tx.add(openPositionIx);
    return tx;
  }

  async getExecuteTradeTx({
    direction,
    leverage,
    amount,
    unsettledAmount,
    position,
    pool,
    liquidityTokenMint,
    priceFeed,
    collateralMint,
    owner,
  }: ExecuteTradeTxParams): Promise<{ tx: Transaction; newPosition: PublicKey }> {
    const liquidityTokenDestination = getAssociatedTokenAddressSync(
      translateAddress(liquidityTokenMint),
      translateAddress(owner)
    );
    const collateralSource = getAssociatedTokenAddressSync(
      translateAddress(collateralMint),
      translateAddress(owner)
    );
    const [unsettledCollateralAccount] = getUnsettledCollateralAccountPda(
      owner,
      this.program.programId
    );
    const [
      closePositionIx,
      liquidityTokenDestinationInfo,
      collateralSourceInfo,
      unsettledCollateralAccountInfo,
    ] = await Promise.all([
      this.getClosePositionIx({
        pool,
        position,
        collateralMint,
        destination: liquidityTokenDestination,
        priceFeed,
        owner,
      }),
      this.program.provider.connection.getAccountInfo(liquidityTokenDestination),
      this.program.provider.connection.getAccountInfo(collateralSource),
      this.program.provider.connection.getAccountInfo(unsettledCollateralAccount),
    ]);
    if (collateralSourceInfo === null) {
      throw new Error("Collateral source account is not initialized");
    }
    if (amount.add(unsettledAmount).isZero()) {
      throw new Error("Amount and unsettled amount cannot both be zero");
    }
    const tx = new Transaction();
    tx.add(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 650_000,
      })
    );
    if (liquidityTokenDestinationInfo === null) {
      const ataIx = createAssociatedTokenAccountInstruction(
        translateAddress(owner),
        translateAddress(liquidityTokenDestination),
        translateAddress(owner),
        translateAddress(liquidityTokenMint)
      );
      tx.add(ataIx);
    }
    tx.add(closePositionIx);
    const deallocatePositionIx = await this.getDeallocatePositionIx({
      pool,
      position,
      owner,
      payer: owner,
    });
    tx.add(deallocatePositionIx);
    const params = {
      direction,
      leverage,
      amount,
      unsettledAmount,
      maxSkewImpactFee: amount.add(unsettledAmount),
    };
    if (unsettledCollateralAccountInfo === null) {
      const createUnsettledCollateralAccountIx = await this.getCreateUnsettledCollateralAccountIx(
        owner
      );
      tx.add(createUnsettledCollateralAccountIx);
    }
    const { id: newPositionId } = await this.getPositions(owner, pool);
    const [newPosition] = getPositionPda(pool, owner, newPositionId, this.program.programId);
    const allocatePositionIx = await this.getAllocatePositionIx({
      id: newPositionId,
      pool,
      position: newPosition,
      owner,
    });
    tx.add(allocatePositionIx);
    const openPositionIx = await this.getOpenPositionIx({
      params,
      pool,
      position: newPosition,
      priceFeed,
      collateralMint,
      owner,
      collateralSource,
    });
    tx.add(openPositionIx);
    return { tx, newPosition };
  }

  ///////////////////////////
  /// INSTRUCTION GETTERS ///
  ///////////////////////////

  async getCreateUnsettledCollateralAccountIx(owner: Address): Promise<TransactionInstruction> {
    const [state] = getStatePda(this.program.programId);
    const [unsettledCollateralAccount] = getUnsettledCollateralAccountPda(
      owner,
      this.program.programId
    );
    return await this.program.methods
      .createUnsettledCollateralAccount()
      .accounts({
        state,
        unsettledCollateralAccount,
        payer: owner,
        owner,
      })
      .instruction();
  }

  async getAllocatePositionIx({
    id,
    pool,
    position,
    owner,
  }: AllocatePositionIxParams): Promise<TransactionInstruction> {
    const [state] = getStatePda(this.program.programId);
    return await this.program.methods
      .allocatePosition(id)
      .accounts({ state, pool, position, payer: owner, owner })
      .instruction();
  }

  async getDeallocatePositionIx({
    pool,
    position,
    owner,
    payer,
  }: DeallocatePositionIxParams): Promise<TransactionInstruction> {
    const [state] = getStatePda(this.program.programId);
    return await this.program.methods
      .deallocatePosition()
      .accounts({ state, pool, position, payer: payer, owner })
      .instruction();
  }

  async getOpenPositionIx({
    params,
    pool,
    position,
    collateralMint,
    collateralSource,
    priceFeed,
    owner,
  }: OpenPositionIxParams): Promise<TransactionInstruction> {
    const [state] = getStatePda(this.program.programId);
    const [unsettledCollateralVault] = getUnsettledCollateralVaultPda(
      collateralMint,
      this.program.programId
    );
    const [liquidityTokenMint] = getLiquidityTokenMintPda(pool, this.program.programId);
    const [liquidityTokenVault] = getLiquidityTokenVaultPda(
      liquidityTokenMint,
      this.program.programId
    );
    const [collateralVault] = getCollateralVaultPda(pool, collateralMint, this.program.programId);
    const [protocolFeeVault] = getProtocolFeeVaultPda(liquidityTokenMint, this.program.programId);
    const [unsettledCollateralAccount] = getUnsettledCollateralAccountPda(
      owner,
      this.program.programId
    );
    return await this.program.methods
      .openPosition(params)
      .accounts({
        modifyPositionAccounts: {
          state,
          pool,
          position,
          liquidityTokenMint,
          liquidityTokenVault,
          collateralVault,
          protocolFeeVault,
          ownerTokenAccount: collateralSource,
          priceFeed,
          payer: owner,
          signer: owner,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
        unsettledCollateralAccount,
        unsettledCollateralVault,
      })
      .instruction();
  }

  async getClosePositionIx({
    pool,
    position,
    collateralMint,
    destination,
    priceFeed,
    owner,
  }: ClosePositionIxParams): Promise<TransactionInstruction> {
    const [state] = getStatePda(this.program.programId);
    const [liquidityTokenMint] = getLiquidityTokenMintPda(pool, this.program.programId);
    const [liquidityTokenVault] = getLiquidityTokenVaultPda(
      liquidityTokenMint,
      this.program.programId
    );
    const [collateralVault] = getCollateralVaultPda(pool, collateralMint, this.program.programId);
    const [protocolFeeVault] = getProtocolFeeVaultPda(liquidityTokenMint, this.program.programId);
    const ix = await this.program.methods
      .closePosition()
      .accounts({
        state,
        pool,
        position,
        liquidityTokenMint,
        collateralVault,
        liquidityTokenVault,
        protocolFeeVault,
        ownerTokenAccount: destination,
        priceFeed,
        payer: owner,
        signer: owner,
      })
      .instruction();
    return ix;
  }

  ////////////////////////////////
  /// ACCOUNT FETCHING HELPERS ///
  ////////////////////////////////

  async getPositions(
    owner: Address,
    pool: Address
  ): Promise<{ positions: ProgramAccount<Position>[]; id: BN }> {
    const positions = (await this.program.account.position.all([
      {
        memcmp: {
          offset: 103,
          bytes: translateAddress(owner).toBase58(),
        },
      },
      {
        memcmp: {
          offset: 71,
          bytes: translateAddress(pool).toBase58(),
        },
      },
    ])) as ProgramAccount<Position>[];
    if (positions.length === 0) return { positions: [], id: new BN(0) };
    positions.sort(({ account: accountA }, { account: accountB }) =>
      accountA.id.sub(accountB.id).toNumber()
    );
    for (let i = 0; i < positions.length; i++) {
      if (!positions[i].account.id.eqn(i)) {
        return { positions, id: new BN(i) };
      }
    }
    const id = positions[positions.length - 1].account.id.addn(1);
    return { positions, id };
  }
}
