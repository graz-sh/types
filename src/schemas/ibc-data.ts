import { z } from "zod";

import { statusSchema } from "./shared";

export const channelOrderSchema = /* @__PURE__ */ z.union([z.literal("ordered"), z.literal("unordered")]);

export const ibcDataSchema = /* @__PURE__ */ z.object({
  $schema: z.string().optional(),
  /**
   * Top level IBC data pertaining to the chain. `chain_1` and `chain_2` should be in alphabetical order.
   */
  chain_1: z.object({
    chain_name: z.string(),
    /**
     * The client ID on the corresponding chain representing the other chain's light client.
     */
    client_id: z.string(),
    /**
     * The connection ID on the corresponding chain representing a connection to the other chain.
     */
    connection_id: z.string(),
  }),
  /**
   * Top level IBC data pertaining to the chain. `chain_1` and `chain_2` should be in alphabetical order.
   */
  chain_2: z.object({
    chain_name: z.string(),
    /**
     * The client ID on the corresponding chain representing the other chain's light client.
     */
    client_id: z.string(),
    /**
     * The connection ID on the corresponding chain representing a connection to the other chain.
     */
    connection_id: z.string(),
  }),
  channels: z.array(
    z.object({
      chain_1: z.object({
        /**
         * The channel ID on the corresponding chain's connection representing a channel on the other chain.
         */
        channel_id: z.string(),
        /**
         * The IBC port ID which a relevant module binds to on the corresponding chain.
         */
        port_id: z.string(),
      }),
      chain_2: z.object({
        /**
         * The channel ID on the corresponding chain's connection representing a channel on the other chain.
         */
        channel_id: z.string(),
        /**
         * The IBC port ID which a relevant module binds to on the corresponding chain.
         */
        port_id: z.string(),
      }),
      /**
       * Determines if packets from a sending module must be 'ordered' or 'unordered'.
       */
      ordering: channelOrderSchema,
      /**
       * IBC Version
       */
      version: z.string(),
      /**
       * Human readable description of the channel.
       */
      description: z.string().optional(),
      /**
       * Human readable key:value pairs that help describe and distinguish channels.
       */
      tags: z
        .record(z.unknown())
        .and(
          z.object({
            status: statusSchema.optional(),
            preferred: z.boolean().optional(),
            dex: z.string().optional(),
            /**
             * String that helps describe non-dex use cases ex: interchain accounts(ICA).
             */
            properties: z.string().optional(),
          }),
        )
        .optional(),
    }),
  ),
});
