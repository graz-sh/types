import type { Asset, AssetLists } from "./assetlist";
import type { Chain } from "./chain";
import type { IbcData } from "./ibc-data";
import type { ChainInfo } from "./keplr/chain-info";
import type { MemoKey, MemoKeys } from "./memo-keys";

export const defineAsset = <T extends Asset>(t: T): T => t;

export const defineAssetList = <T extends AssetLists>(t: T): T => t;

export const defineChain = <T extends Chain>(t: T): T => t;

export const defineChainInfo = <T extends ChainInfo>(t: T): T => t;

export const defineIbcData = <T extends IbcData>(t: T): T => t;

export const defineMemoKey = <T extends MemoKey>(t: T): T => t;

export const defineMemoKeys = <T extends MemoKeys>(t: T): T => t;
