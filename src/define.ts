import type { ChainInfo } from "./keplr/chain-info";
import type { Asset, AssetList, Chain } from "./registry";

export const defineAsset = <T extends Asset>(asset: T): T => {
  return asset;
};

export const defineAssetList = <T extends AssetList>(assetlist: T): T => {
  return assetlist;
};

export const defineChain = <T extends Chain>(chain: T): T => {
  return chain;
};

export const defineChainInfo = <T extends ChainInfo>(chainInfo: T): T => {
  return chainInfo;
};
