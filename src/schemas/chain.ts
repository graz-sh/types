import { z } from "zod";

import { bech32ConfigSchema } from "./bech32";
import { imageTypeSchema, statusSchema } from "./shared";

export const networkTypeSchema = /* @__PURE__ */ z.union([
  z.literal("mainnet"),
  z.literal("testnet"),
  z.literal("devnet"),
]);

export const keyAlgosSchema = /* @__PURE__ */ z.union([
  z.literal("secp256k1"),
  z.literal("ethsecp256k1"),
  z.literal("ed25519"),
  z.literal("sr25519"),
  z.literal("bn254"),
]);

export const consensusTypeSchema = /* @__PURE__ */ z.union([
  z.literal("tendermint"),
  z.literal("cometbft"),
  z.literal("sei-tendermint"),
]);

export const icsTypeSchema = /* @__PURE__ */ z.union([z.literal("ics20-1"), z.literal("ics27-1"), z.literal("mauth")]);

export const extraCodecSchema = /* @__PURE__ */ z.union([z.literal("ethermint"), z.literal("injective")]);

export const feeTokenSchema = /* @__PURE__ */ z.object({
  denom: z.string(),
  fixed_min_gas_price: z.number().optional(),
  low_gas_price: z.number().optional(),
  average_gas_price: z.number().optional(),
  high_gas_price: z.number().optional(),
  gas_costs: z
    .object({
      cosmos_send: z.number().optional(),
      ibc_transfer: z.number().optional(),
    })
    .optional(),
});

export const stakingTokenSchema = /* @__PURE__ */ z.object({
  denom: z.string(),
});

export const peerSchema = /* @__PURE__ */ z.object({
  id: z.string(),
  address: z.string(),
  provider: z.string().optional(),
});

export const endpointSchema = /* @__PURE__ */ z.object({
  address: z.string(),
  provider: z.string().optional(),
  archive: z.boolean().optional(),
});

export const explorerSchema = /* @__PURE__ */ z.object({
  kind: z.string().optional(),
  url: z.string().optional(),
  tx_page: z.string().optional(),
  account_page: z.string().optional(),
});

/**
 * Cosmos Chain.json is a metadata file that contains information about a cosmos sdk based chain.
 */
export const chainSchema = /* @__PURE__ */ z.object({
  $schema: z.string().optional(),
  chain_name: z.string(),
  chain_id: z.string(),
  pre_fork_chain_name: z.string().optional(),
  pretty_name: z.string(),
  website: z.string().optional(),
  update_link: z.string().optional(),
  status: statusSchema,
  network_type: networkTypeSchema,
  /**
   * The default prefix for the human-readable part of addresses that identifies the coin type. Must be registered with SLIP-0173. E.g., 'cosmos'
   */
  bech32_prefix: z.string(),
  /**
   * Used to override the bech32_prefix for specific uses.
   */
  bech32_config: bech32ConfigSchema.optional(),
  daemon_name: z.string().optional(),
  node_home: z.string().optional(),
  key_algos: z.array(keyAlgosSchema).optional(),
  slip44: z.number().default(118),
  alternative_slip44s: z.array(z.number()).optional(),
  fees: z
    .object({
      fee_tokens: z.array(feeTokenSchema),
    })
    .optional(),
  staking: z
    .object({
      staking_tokens: z.array(stakingTokenSchema),
      lock_duration: z
        .object({
          /**
           * The number of blocks for which the staked tokens are locked.
           */
          blocks: z.number().optional(),
          /**
           * The approximate time for which the staked tokens are locked.
           */
          time: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  codebase: z
    .object({
      git_repo: z.string().optional(),
      recommended_version: z.string().optional(),
      compatible_versions: z.array(z.string()).optional(),
      binaries: z
        .object({
          "linux/amd64": z.string().optional(),
          "linux/arm64": z.string().optional(),
          "darwin/amd64": z.string().optional(),
          "darwin/arm64": z.string().optional(),
          "windows/amd64": z.string().optional(),
          "windows/arm64": z.string().optional(),
        })
        .optional(),
      cosmos_sdk_version: z.string().optional(),
      consensus: z
        .object({
          type: consensusTypeSchema,
          version: z.string().optional(),
        })
        .optional(),
      cosmwasm_version: z.string().optional(),
      cosmwasm_enabled: z.boolean().optional(),
      /**
       * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
       */
      cosmwasm_path: z.string().optional(),
      ibc_go_version: z.string().optional(),
      /**
       * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
       */
      ics_enabled: z.array(icsTypeSchema).optional(),
      genesis: z
        .object({
          name: z.string().optional(),
          genesis_url: z.string(),
          ics_ccv_url: z.string().optional(),
        })
        .optional(),
      versions: z
        .array(
          z.object({
            /**
             * Official Upgrade Name
             */
            name: z.string(),
            /**
             * Git Upgrade Tag
             */
            tag: z.string().optional(),
            /**
             * Block Height
             */
            height: z.number().optional(),
            /**
             * Proposal that will officially signal community acceptance of the upgrade.
             */
            proposal: z.number().optional(),
            /**
             * [Optional] Name of the following version
             */
            next_version_name: z.string().optional(),
            recommended_version: z.string().optional(),
            compatible_versions: z.array(z.string()).optional(),
            cosmos_sdk_version: z.string().optional(),
            consensus: z
              .object({
                type: consensusTypeSchema,
                version: z.string().optional(),
              })
              .optional(),
            cosmwasm_version: z.string().optional(),
            cosmwasm_enabled: z.boolean().optional(),
            /**
             * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
             */
            cosmwasm_path: z.string().optional(),
            ibc_go_version: z.string().optional(),
            /**
             * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
             */
            ics_enabled: z.array(icsTypeSchema).optional(),
            binaries: z
              .object({
                "linux/amd64": z.string().optional(),
                "linux/arm64": z.string().optional(),
                "darwin/amd64": z.string().optional(),
                "darwin/arm64": z.string().optional(),
                "windows/amd64": z.string().optional(),
                "windows/arm64": z.string().optional(),
              })
              .optional(),
          }),
        )
        .optional(),
    })
    .optional(),
  images: z.array(imageTypeSchema).optional(),
  logo_URIs: z
    .object({
      png: z.string().optional(),
      svg: z.string().optional(),
    })
    .optional(),
  peers: z
    .object({
      seeds: z.array(peerSchema).optional(),
      persistent_peers: z.array(peerSchema).optional(),
    })
    .optional(),
  apis: z
    .object({
      rpc: z.array(endpointSchema).optional(),
      rest: z.array(endpointSchema).optional(),
      grpc: z.array(endpointSchema).optional(),
      wss: z.array(endpointSchema).optional(),
      "grpc-web": z.array(endpointSchema).optional(),
      "evm-http-jsonrpc": z.array(endpointSchema).optional(),
    })
    .optional(),
  explorers: z.array(explorerSchema).optional(),
  keywords: z.array(z.string()).optional(),
  extra_codecs: z.array(extraCodecSchema).optional(),
});
