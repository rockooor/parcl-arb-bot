import { Connection, Keypair, TransactionInstruction, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import bs58 from 'bs58';
import { ParclV2Client } from './helpers/client';
import { translateAddress, BN } from '@project-serum/anchor';
import { getPositionPda } from './helpers/utils';

require('dotenv').config();

const LEVERAGE = 10;

// @TODO: this can be made smarter by setting this value to at most half your wallet balance
// or the max size that makes the funding rate go to 50% (whichever is smaller)
// However, here you need to take into account that you need to deploy half of the capital in
// the hedge pool and be careful to not sway the funding rate of the hedge pool too negative
const AMOUNT = 0.5; // $0.5 to buy

const keypair = Keypair.fromSecretKey(bs58.decode(process.env.WALLET_PRIVATE_KEY!));

const connection = new Connection(process.env.RPC_ENDPOINT!);

const closePositions = async (client: ParclV2Client, positions: {
    position: Awaited<ReturnType<typeof client.getPositions>>['positions'][number],
    poolInfo: Awaited<ReturnType<typeof client.program.account.pool.fetch>>,
}[]) => {
    const closePositionIxs = await Promise.all(positions.map(async ({ position, poolInfo }) => {
        const liquidityTokenDestination = getAssociatedTokenAddressSync(
            translateAddress(poolInfo.liquidityTokenMint),
            translateAddress(position.account.owner)
        );

        const txs: TransactionInstruction[] = [];

        // Check if we have a liquidty token account
        const liquidityTokenDestinationInfo = await connection.getAccountInfo(liquidityTokenDestination);
        if (!liquidityTokenDestinationInfo) {
            txs.push(createAssociatedTokenAccountInstruction(
                translateAddress(position.account.owner),
                translateAddress(liquidityTokenDestination),
                translateAddress(position.account.owner),
                translateAddress(poolInfo.liquidityTokenMint)
            ));
        }

        txs.push(await client.getClosePositionIx({
            pool: position.account.pool,
            position: position.publicKey,
            collateralMint: poolInfo.collateralMint,
            destination: liquidityTokenDestination,
            owner: position.account.owner,
            priceFeed: poolInfo.priceFeed,
        }))

        // Deallocate
        txs.push(await client.getDeallocatePositionIx({
            pool: position.account.pool,
            position: position.publicKey,
            owner: position.account.owner,
            payer: position.account.owner,
        }))

        // @TODO: remove liquidity to get back USDC.
        // This is difficult as you need to burn the liquidity using removeLiquidity
        // which has no client function and enters an 8 hour withdraw window.

        return txs;
    }))

    const latestBlockhash = await connection.getLatestBlockhash('finalized');
    const tx: TransactionInstruction[] = [];

    tx.push(...closePositionIxs.flat());

    const messageV0 = new TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: tx
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);

    transaction.sign([keypair])
    const stx = transaction.serialize();
    const txid = await connection.sendRawTransaction(stx, { maxRetries: 5 })

    console.log(`Closed hedged position with TX ID: ${txid}`)
    console.log(`Please keep in mind the position is closed but stored as LP positions, which can be managed on parcl.co`)
    console.log(`In a future release of this bot, a removeLiquidity instruction will be called to do this automatically`)
}

/**
 * Check if we need to close the current position. We need to close if
 * the arb funding rate + hedge funding rate is negative
 */
const maybeClose = async (client: ParclV2Client, arbPosition: Awaited<ReturnType<typeof client.getPositions>>['positions'][number]) => {
    // Get necessary info to calculate current funding rate
    const [arbPoolInfo, hedgePoolInfo, hedgePositions] = await Promise.all([
        client.program.account.pool.fetch(process.env.ARB_POOL!),
        client.program.account.pool.fetch(process.env.HEDGE_POOL!),
        client.getPositions(client.wallet.publicKey, process.env.HEDGE_POOL!),
    ]);

    const hedgePosition = hedgePositions.positions?.[0];

    const arbFundingRate = Number(arbPoolInfo.skewManager.cumulativeFundingRate) / 1e9;
    const hedgeFundingRate = Number(hedgePoolInfo.skewManager.cumulativeFundingRate) / 1e9;

    const arbPositionDirection = arbPosition.account.direction ? 1 : -1;
    const hedgePositionDirection = hedgePosition?.account.direction ? 1 : -1;

    // Calculate net funding rate
    const netFundingRate = arbFundingRate * arbPositionDirection + hedgeFundingRate * hedgePositionDirection;

    console.log(`Current funding rate: ${netFundingRate}`);

    if (netFundingRate < 0) {
        console.log(`Making loss, close positions`);
        return closePositions(
            client,
            [
                { position: arbPosition, poolInfo: arbPoolInfo},
                { position: hedgePosition, poolInfo: hedgePoolInfo }
            ]);
    } else {
        console.log(`Making profit, continue...`);
        return true;
    }
}

const getOpenPositionIx = async (
    client: ParclV2Client,
    poolInfo: Awaited<ReturnType<typeof client.program.account.pool.fetch>>,
    pool: string,
) => {
    // Open arb pool TX
    let direction: number;
    if (poolInfo.skewManager.openInterestLong.lt(poolInfo.skewManager.openInterestShort)) {
        // Make money long
        direction = 1
    } else {
        direction = -1
    }

    const { id } = await client.getPositions(client.wallet.publicKey, pool);
    const [currentPosition] = getPositionPda(
      pool,
      client.wallet.publicKey,
      id.isZero() ? id : id.sub(new BN(1)),
      client.program.programId
    );

    const ix = await client.getOpenPositionTx({
      direction: direction === 1,
      leverage: LEVERAGE,
      amount: new BN(AMOUNT * 1e6),
      unsettledAmount: new BN(0),
      position: currentPosition,
      pool: pool,
      priceFeed: poolInfo.priceFeed,
      collateralMint: poolInfo.collateralMint,
      owner: client.wallet.publicKey,
    });

    return ix.instructions;
}

const openPosition = async (
    client: ParclV2Client,
    arbPoolInfo: Awaited<ReturnType<typeof client.program.account.pool.fetch>>,
    hedgePoolInfo: Awaited<ReturnType<typeof client.program.account.pool.fetch>>
) => {
    const openArbIx = await getOpenPositionIx(client, arbPoolInfo, process.env.ARB_POOL!);
    const openHedgeIx = await getOpenPositionIx(client, hedgePoolInfo, process.env.HEDGE_POOL!);

    const tx: TransactionInstruction[] = [];
    tx.push(...openArbIx)
    tx.push(...openHedgeIx)

    const latestBlockhash = await connection.getLatestBlockhash('finalized');
    const messageV0 = new TransactionMessage({
        payerKey: keypair.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: tx
    }).compileToV0Message();
    const transaction = new VersionedTransaction(messageV0);

    transaction.sign([keypair])
    const stx = transaction.serialize();
    const txid = await connection.sendRawTransaction(stx, { maxRetries: 5 })

    console.log(`Opened hedged position with TX ID: ${txid}`)
}

const maybeOpen = async (client: ParclV2Client) => {
    const [arbPoolInfo, hedgePoolInfo] = await Promise.all([
        client.program.account.pool.fetch(process.env.ARB_POOL!),
        client.program.account.pool.fetch(process.env.HEDGE_POOL!),
    ]);

    const arbFundingRate = Number(arbPoolInfo.skewManager.cumulativeFundingRate) / 1e9;
    const hedgeFundingRate = Number(hedgePoolInfo.skewManager.cumulativeFundingRate) / 1e9;

    // Get arb direction
    let arbDirection: number;
    if (arbPoolInfo.skewManager.openInterestLong.lt(arbPoolInfo.skewManager.openInterestShort)) {
        // Make money long
        arbDirection = 1
    } else {
        arbDirection = -1
    }

    // Get hedge direction
    let hedgeDirection: number;
    if (hedgePoolInfo.skewManager.openInterestLong.lt(hedgePoolInfo.skewManager.openInterestShort)) {
        hedgeDirection = 1
    } else {
        hedgeDirection = -1
    }

    // Calculate net funding rate
    const netFundingRate = arbDirection * arbFundingRate + hedgeFundingRate * hedgeDirection

    // Open if we make money
    if (netFundingRate > 0) {
        console.log(`Found position with net funding rate of ${netFundingRate}`)
        openPosition(client, arbPoolInfo, hedgePoolInfo)
    }
};

/**
 * This bot arbs the funding rate by taking a position to farm funding rate and hedge the price risk
 * against a correlated market. In the example for this hackathon, it farms the funding rate of
 * Philidelphia, PA and hedges the price risk against the USA market.
 * 
 * Typically, the hedged market opens a position that costs funding, but because that market
 * is (should be) way bigger than of a typical city, the funding rate is less. As long
 * as the funding rate of the arb pool is higher than the hedge pool, we make a profit.
 */
const exec = async () => {
    const client = ParclV2Client.load();

    // If we have an open position, check if we need to close it.
    // If not, check if we need to open one.
    const { positions } = await client.getPositions(client.wallet.publicKey, process.env.ARB_POOL!);
    if (positions.length > 0) {
        console.log(`Has open position, check if we need to close`)
        await maybeClose(client, positions[0]);
    } else {
        console.log(`No open position, maybe open one`)
        await maybeOpen(client);
    }
};

const run = async () => {
    do {
        console.log('')
        console.log(`Checking positions...`)
        try {
            await exec()
            await new Promise(resolve => setTimeout(resolve, 60000))
        } catch(e) {
            console.log(`Some error happened:`)
            console.log(e)
        }
    } while(true);
}

run();
