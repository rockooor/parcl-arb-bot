import { Decimal } from "decimal.js";
import {
  AllAccountsMap,
  IdlTypes,
  TypeDef,
} from "@project-serum/anchor/dist/cjs/program/namespace/types";
import { ParclV2Core } from "./idl";

export type Pool = TypeDef<AllAccountsMap<ParclV2Core>["pool"], IdlTypes<ParclV2Core>>;

export type Position = TypeDef<AllAccountsMap<ParclV2Core>["position"], IdlTypes<ParclV2Core>>;

export type SkewInfo = {
  skew: Decimal;
  openInterestLong: Decimal;
  openInterestShort: Decimal;
  cumulativeFundingRate: Decimal;
};
