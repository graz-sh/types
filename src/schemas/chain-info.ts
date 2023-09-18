import { z } from "zod";

import { bech32ConfigSchema } from "./bech32";
import { bip44Schema } from "./bip44";
import { appCurrencySchema, currencySchema, feeCurrencySchema } from "./currency";

export const chainInfoSchema = /* @__PURE__ */ z.object({
  rpc: z.string(),
  rest: z.string(),
  nodeProvider: z
    .object({
      name: z.string(),
      email: z.string(),
      website: z.string().optional(),
    })
    .optional(),
  chainId: z.string(),
  chainName: z.string(),
  /**
   * This indicates the type of coin that can be used for stake.
   * You can get actual currency information from Currencies.
   */
  stakeCurrency: currencySchema,
  walletUrl: z.string().optional(),
  walletUrlForStaking: z.string().optional(),
  bip44: bip44Schema,
  alternativeBIP44s: z.array(bip44Schema).optional(),
  bech32Config: bech32ConfigSchema,

  currencies: z.array(appCurrencySchema),
  /**
   * This indicates which coin or token can be used for fee to send transaction.
   * You can get actual currency information from Currencies.
   */
  feeCurrencies: z.array(feeCurrencySchema),

  /**
   * Indicate the features supported by this chain. Ex) cosmwasm, secretwasm ...
   */
  features: z.array(z.string()).optional(),

  /**
   * Shows whether the blockchain is in production phase or beta phase.
   * Major features such as staking and sending are supported on staging blockchains, but without guarantee.
   * If the blockchain is in an early stage, please set it as beta.
   */
  beta: z.boolean().optional(),

  chainSymbolImageUrl: z.string().optional(),
});
