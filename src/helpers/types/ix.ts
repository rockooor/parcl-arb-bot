import { Address, BN } from "@project-serum/anchor";

export type OpenPositionOnchainIxParams = {
  direction: boolean;
  leverage: number;
  amount: BN;
  unsettledAmount: BN;
  maxSkewImpactFee: BN;
};

export type OpenPositionIxParams = {
  params: OpenPositionOnchainIxParams;
  pool: Address;
  position: Address;
  collateralMint: Address;
  collateralSource: Address;
  priceFeed: Address;
  owner: Address;
};

export type OpenPositionTxParams = {
  direction: boolean;
  leverage: number;
  amount: BN;
  unsettledAmount: BN;
  pool: Address;
  position: Address;
  priceFeed: Address;
  collateralMint: Address;
  owner: Address;
};

export type AllocatePositionIxParams = {
  id: BN;
  pool: Address;
  position: Address;
  owner: Address;
};

export type DeallocatePositionIxParams = {
  pool: Address;
  position: Address;
  owner: Address;
  payer: Address;
};

export type ClosePositionIxParams = {
  pool: Address;
  position: Address;
  collateralMint: Address;
  destination: Address;
  priceFeed: Address;
  owner: Address;
};

export type ExecuteTradeTxParams = {
  direction: boolean;
  leverage: number;
  amount: BN;
  unsettledAmount: BN;
  pool: Address;
  position: Address;
  collateralMint: Address;
  liquidityTokenMint: Address;
  priceFeed: Address;
  owner: Address;
};

// import { Address, BN } from "@project-serum/anchor";

// export type OpenPositionOnchainIxParams = {
//   direction: boolean;
//   leverage: number;
//   amount: BN;
//   unsettledAmount: BN;
//   maxSkewImpactFee: BN;
// };

// export type OpenPositionIxParams = {
//   params: OpenPositionOnchainIxParams;
//   pool: Address;
//   position: Address;
//   collateralMint: Address;
//   collateralSource: Address;
//   priceFeed: Address;
//   owner: Address;
// };

// export type OpenPositionTxParams = {
//   id: BN;
//   direction: boolean;
//   leverage: number;
//   amount: BN;
//   unsettledAmount: BN;
//   pool: Address;
//   position: Address;
//   priceFeed: Address;
//   collateralMint: Address;
//   owner: Address;
// };

// export type AllocatePositionIxParams = {
//   id: BN;
//   pool: Address;
//   position: Address;
//   owner: Address;
// };

// export type DeallocatePositionIxParams = {
//   pool: Address;
//   position: Address;
//   owner: Address;
//   payer: Address;
// };

// export type ClosePositionIxParams = {
//   pool: Address;
//   position: Address;
//   collateralMint: Address;
//   destination: Address;
//   priceFeed: Address;
//   owner: Address;
// };

// export type ClosePositionTxParams = {
//   pool: Address;
//   position: Address;
//   collateralMint: Address;
//   liquidityTokenMint: Address;
//   priceFeed: Address;
//   owner: Address;
// };
