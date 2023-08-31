// https://github.com/cosmos/chain-registry/blob/master/assetlist.schema.json
// https://transform.tools/json-schema-to-typescript

import type { ImageType } from "./shared";

/**
 * Asset lists are a similar mechanism to allow frontends and other UIs to fetch metadata associated with Cosmos SDK denoms, especially for assets sent over IBC.
 */
export interface AssetList {
  $schema?: string;
  chain_name: string;
  assets: Asset[];
}

export type AssetType = "sdk.coin" | "cw20" | "erc20" | "ics20" | "snip20" | "snip25";

export interface Asset {
  /**
   * [OPTIONAL] A short description of the asset
   */
  description?: string;
  denom_units: DenomUnit[];
  /**
   * [OPTIONAL] The potential options for type of asset. By default, assumes sdk.coin
   */
  type_asset?: AssetType;
  /**
   * [OPTIONAL] The address of the asset. Only required for type_asset : cw20, snip20
   */
  address?: string;
  /**
   * The base unit of the asset. Must be in denom_units.
   */
  base: string;
  /**
   * The project name of the asset. For example Bitcoin.
   */
  name: string;
  /**
   * The human friendly unit of the asset. Must be in denom_units.
   */
  display: string;
  /**
   * The symbol of an asset. For example BTC.
   */
  symbol: string;
  /**
   * The origin of the asset, starting with the index, and capturing all transitions in form and location.
   */
  traces?: (IbcTransition | IbcCw20Transition | NonIbcTransition)[];
  /**
   * [OPTIONAL] IBC Channel between src and dst between chain
   */
  ibc?: {
    source_channel: string;
    dst_channel: string;
    source_denom: string;
  };
  logo_URIs?: {
    png?: string;
    svg?: string;
  };
  images?: [ImageType, ...ImageType[]];
  /**
   * [OPTIONAL] The coingecko id to fetch asset data from coingecko v3 api. See https://api.coingecko.com/api/v3/coins/list
   */
  coingecko_id?: string;
  keywords?: string[];
}

export interface DenomUnit {
  denom: string;
  exponent: number;
  aliases?: string[];
}

export type TransitionType = IbcTransitionType | IbcCw20TransitionType | NonIbcTransitionType;

export type IbcTransitionType = "ibc";

export interface IbcTransition {
  type: IbcTransitionType;
  counterparty: {
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: string;
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: string;
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
  };
  chain: {
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: string;
  };
}

export type IbcCw20TransitionType = "ibc-cw20";

export interface IbcCw20Transition {
  type: IbcCw20TransitionType;
  counterparty: {
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: string;
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: string;
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: string;
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
  };
  chain: {
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: string;
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: string;
  };
}

export type NonIbcTransitionType =
  | "bridge"
  | "liquid-stake"
  | "synthetic"
  | "wrapped"
  | "additional-mintage"
  | "test-mintage";

export interface NonIbcTransition {
  type: NonIbcTransitionType;
  counterparty: {
    /**
     * The chain or platform from which the asset originates. E.g., 'cosmoshub', 'ethereum', 'forex', or 'nasdaq'
     */
    chain_name: string;
    base_denom: string;
    /**
     * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
     */
    contract?: string;
  };
  chain?: {
    /**
     * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
     */
    contract: string;
  };
  /**
   * The entity offering the service. E.g., 'Gravity Bridge' [Network] or 'Tether' [Company].
   */
  provider: string;
}
