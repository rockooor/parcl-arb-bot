import { utils, Address, translateAddress, BN } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

const LIQUIDITY_TOKEN_MINT_PREFIX = "liquidity_token_mint";
const LIQUIDITY_TOKEN_VAULT_PREFIX = "liquidity_token_vault";
const COLLATERAL_VAULT_PREFIX = "collateral_vault";
const UNSETTLED_COLLATERAL_VAULT_PREFIX = "unsettled_collateral_vault";
const PROTOCOL_FEE_VAULT_PREFIX = "protocol_fee_vault";
const UNSETTLED_COLLATERAL_ACCOUNT_PREFIX = "unsettled_collateral_account";
const POSITION_PREFIX = "position";

export function getStatePda(programId: Address): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync([], translateAddress(programId));
}

export function getUnsettledCollateralVaultPda(
  collateralMint: Address,
  programId: Address
): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [Buffer.from(UNSETTLED_COLLATERAL_VAULT_PREFIX), translateAddress(collateralMint).toBytes()],
    translateAddress(programId)
  );
}

export function getPositionPda(
  pool: Address,
  owner: Address,
  id: BN,
  programId: Address
): [PublicKey, number] {
  if (id.ltn(0) || id.gt(new BN((2 ** 64 - 1).toString()))) {
    throw new Error("Max id is max uint 64");
  }
  return utils.publicKey.findProgramAddressSync(
    [
      Buffer.from(POSITION_PREFIX),
      translateAddress(pool).toBytes(),
      translateAddress(owner).toBytes(),
      id.toArrayLike(Buffer, "le", 8),
    ],
    translateAddress(programId)
  );
}

export function getLiquidityTokenMintPda(pool: Address, programId: Address): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [Buffer.from(LIQUIDITY_TOKEN_MINT_PREFIX), translateAddress(pool).toBytes()],
    translateAddress(programId)
  );
}

export function getLiquidityTokenVaultPda(
  liquidityTokenMint: Address,
  programId: Address
): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [Buffer.from(LIQUIDITY_TOKEN_VAULT_PREFIX), translateAddress(liquidityTokenMint).toBytes()],
    translateAddress(programId)
  );
}

export function getCollateralVaultPda(
  pool: Address,
  collateralMint: Address,
  programId: Address
): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [
      Buffer.from(COLLATERAL_VAULT_PREFIX),
      translateAddress(pool).toBytes(),
      translateAddress(collateralMint).toBytes(),
    ],
    translateAddress(programId)
  );
}

export function getProtocolFeeVaultPda(
  liquidityTokenMint: Address,
  programId: Address
): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_FEE_VAULT_PREFIX), translateAddress(liquidityTokenMint).toBytes()],
    translateAddress(programId)
  );
}

export function getUnsettledCollateralAccountPda(
  owner: Address,
  programId: Address
): [PublicKey, number] {
  return utils.publicKey.findProgramAddressSync(
    [Buffer.from(UNSETTLED_COLLATERAL_ACCOUNT_PREFIX), translateAddress(owner).toBytes()],
    translateAddress(programId)
  );
}
