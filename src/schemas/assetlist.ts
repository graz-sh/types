import { z } from "zod";

import { imageTypeSchema } from "./shared";

/**
 * Asset lists are a similar mechanism to allow frontends and other UIs to fetch metadata associated with Cosmos SDK denoms, especially for assets sent over IBC.
 */
export const assetTypeSchema = /* @__PURE__ */ z.union([
  z.literal("sdk.coin"),
  z.literal("cw20"),
  z.literal("erc20"),
  z.literal("ics20"),
  z.literal("snip20"),
  z.literal("snip25"),
]);

export const denomUnitSchema = /* @__PURE__ */ z.object({
  denom: z.string(),
  exponent: z.number(),
  aliases: z.array(z.string()).optional(),
});

export const ibcTransitionTypeSchema = /* @__PURE__ */ z.literal("ibc");

export const ibcTransitionSchema = /* @__PURE__ */ z.object({
  type: ibcTransitionTypeSchema,
  counterparty: z.object({
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: z.string(),
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: z.string(),
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: z.string(),
  }),
  chain: z.object({
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: z.string(),
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: z.string(),
  }),
});

export const ibcCw20TransitionTypeSchema = /* @__PURE__ */ z.literal("ibc-cw20");

export const ibcCw20TransitionSchema = /* @__PURE__ */ z.object({
  type: ibcCw20TransitionTypeSchema,
  counterparty: z.object({
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: z.string(),
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: z.string(),
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: z.string(),
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: z.string(),
  }),
  chain: z.object({
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: z.string(),
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: z.string(),
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: z.string(),
  }),
});

export const nonIbcTransitionTypeSchema = /* @__PURE__ */ z.union([
  z.literal("bridge"),
  z.literal("liquid-stake"),
  z.literal("synthetic"),
  z.literal("wrapped"),
  z.literal("additional-mintage"),
  z.literal("test-mintage"),
]);

export const nonIbcTransitionSchema = /* @__PURE__ */ z.object({
  type: nonIbcTransitionTypeSchema,
  counterparty: z.object({
    /**
     * The chain or platform from which the asset originates. E.g., 'cosmoshub', 'ethereum', 'forex', or 'nasdaq'
     */
    chain_name: z.string(),
    base_denom: z.string(),
    /**
     * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
     */
    contract: z.string().optional(),
  }),
  chain: z
    .object({
      /**
       * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
       */
      contract: z.string(),
    })
    .optional(),
  /**
   * The entity offering the service. E.g., 'Gravity Bridge' [Network] or 'Tether' [Company].
   */
  provider: z.string(),
});

export const assetSchema = /* @__PURE__ */ z.object({
  /**
   * [OPTIONAL] A short description of the asset
   */
  description: z.string().optional(),
  denom_units: z.array(denomUnitSchema),
  /**
   * [OPTIONAL] The potential options for type of asset. By default, assumes sdk.coin
   */
  type_asset: assetTypeSchema.optional(),
  /**
   * [OPTIONAL] The address of the asset. Only required for type_asset : cw20, snip20
   */
  address: z.string().optional(),
  /**
   * The base unit of the asset. Must be in denom_units.
   */
  base: z.string(),
  /**
   * The project name of the asset. For example Bitcoin.
   */
  name: z.string(),
  /**
   * The human friendly unit of the asset. Must be in denom_units.
   */
  display: z.string(),
  /**
   * The symbol of an asset. For example BTC.
   */
  symbol: z.string(),
  /**
   * The origin of the asset, starting with the index, and capturing all transitions in form and location.
   */
  traces: z.array(z.union([ibcTransitionSchema, ibcCw20TransitionSchema, nonIbcTransitionSchema])).optional(),
  /**
   * [OPTIONAL] IBC Channel between src and dst between chain
   */
  ibc: z
    .object({
      source_channel: z.string(),
      dst_channel: z.string(),
      source_denom: z.string(),
    })
    .optional(),
  logo_URIs: z
    .object({
      png: z.string().optional(),
      svg: z.string().optional(),
    })
    .optional(),
  images: z.tuple([imageTypeSchema, z.any()]).optional(),
  /**
   * [OPTIONAL] The coingecko id to fetch asset data from coingecko v3 api. See https://api.coingecko.com/api/v3/coins/list
   */
  coingecko_id: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

export const transitionTypeSchema = /* @__PURE__ */ z.union([
  ibcTransitionTypeSchema,
  ibcCw20TransitionTypeSchema,
  nonIbcTransitionTypeSchema,
]);

/**
 * Asset lists are a similar mechanism to allow frontends and other UIs to fetch metadata associated with Cosmos SDK denoms, especially for assets sent over IBC.
 */
export const assetListSchema = /* @__PURE__ */ z.object({
  $schema: z.string().optional(),
  chain_name: z.string(),
  assets: z.array(assetSchema),
});
