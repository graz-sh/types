// https://github.com/cosmos/chain-registry/blob/master/chain.schema.json
// https://transform.tools/json-schema-to-typescript

import type { Bech32Config } from "./bech32";
import type { ImageType, Status } from "./shared";

export type NetworkType = "mainnet" | "testnet" | "devnet";

export type KeyAlgos = "secp256k1" | "ethsecp256k1" | "ed25519" | "sr25519";

export type ConsensusType = "tendermint" | "cometbft";

export type IcsType = "ics20-1" | "ics27-1" | "mauth";

export type ExtraCodec = "ethermint" | "injective";

/**
 * Cosmos Chain.json is a metadata file that contains information about a cosmos sdk based chain.
 */
export interface Chain {
  $schema?: string;
  chain_name: string;
  chain_id: string;
  pre_fork_chain_name?: string;
  pretty_name?: string;
  website?: string;
  update_link?: string;
  status?: Status;
  network_type?: NetworkType;
  /**
   * The default prefix for the human-readable part of addresses that identifies the coin type. Must be registered with SLIP-0173. E.g., 'cosmos'
   */
  bech32_prefix: string;
  /**
   * Used to override the bech32_prefix for specific uses.
   */
  bech32_config?: Bech32Config;
  daemon_name?: string;
  node_home?: string;
  key_algos?: KeyAlgos[];
  slip44?: number;
  alternative_slip44s?: number[];
  fees?: {
    fee_tokens: FeeToken[];
  };
  staking?: {
    staking_tokens: StakingToken[];
    lock_duration?: {
      /**
       * The number of blocks for which the staked tokens are locked.
       */
      blocks?: number;
      /**
       * The approximate time for which the staked tokens are locked.
       */
      time?: string;
    };
  };
  codebase?: {
    git_repo?: string;
    recommended_version?: string;
    compatible_versions?: string[];
    binaries?: {
      "linux/amd64"?: string;
      "linux/arm64"?: string;
      "darwin/amd64"?: string;
      "darwin/arm64"?: string;
      "windows/amd64"?: string;
      "windows/arm64"?: string;
    };
    cosmos_sdk_version?: string;
    consensus?: {
      type: ConsensusType;
      version?: string;
    };
    cosmwasm_version?: string;
    cosmwasm_enabled?: boolean;
    /**
     * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
     */
    cosmwasm_path?: string;
    ibc_go_version?: string;
    /**
     * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
     */
    ics_enabled?: IcsType[];
    genesis?: {
      name?: string;
      genesis_url: string;
      ics_ccv_url?: string;
    };
    versions?: {
      /**
       * Official Upgrade Name
       */
      name: string;
      /**
       * Git Upgrade Tag
       */
      tag?: string;
      /**
       * Block Height
       */
      height?: number;
      /**
       * Proposal that will officially signal community acceptance of the upgrade.
       */
      proposal?: number;
      /**
       * [Optional] Name of the following version
       */
      next_version_name?: string;
      recommended_version?: string;
      compatible_versions?: string[];
      cosmos_sdk_version?: string;
      consensus?: {
        type: ConsensusType;
        version?: string;
      };
      cosmwasm_version?: string;
      cosmwasm_enabled?: boolean;
      /**
       * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
       */
      cosmwasm_path?: string;
      ibc_go_version?: string;
      /**
       * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
       */
      ics_enabled?: IcsType[];
      binaries?: {
        "linux/amd64"?: string;
        "linux/arm64"?: string;
        "darwin/amd64"?: string;
        "darwin/arm64"?: string;
        "windows/amd64"?: string;
        "windows/arm64"?: string;
      };
    }[];
  };
  images?: ImageType[];
  logo_URIs?: {
    png?: string;
    svg?: string;
  };
  peers?: {
    seeds?: Peer[];
    persistent_peers?: Peer[];
  };
  apis?: {
    rpc?: Endpoint[];
    rest?: Endpoint[];
    grpc?: Endpoint[];
    wss?: Endpoint[];
    "grpc-web"?: Endpoint[];
    "evm-http-jsonrpc"?: Endpoint[];
  };
  explorers?: Explorer[];
  keywords?: string[];
  extra_codecs?: ExtraCodec[];
}

export interface FeeToken {
  denom: string;
  fixed_min_gas_price?: number;
  low_gas_price?: number;
  average_gas_price?: number;
  high_gas_price?: number;
  gas_costs?: {
    cosmos_send?: number;
    ibc_transfer?: number;
  };
}

export interface StakingToken {
  denom: string;
}

export interface Peer {
  id: string;
  address: string;
  provider?: string;
}

export interface Endpoint {
  address: string;
  provider?: string;
  archive?: boolean;
}

export interface Explorer {
  kind?: string;
  url?: string;
  tx_page?: string;
  account_page?: string;
}
