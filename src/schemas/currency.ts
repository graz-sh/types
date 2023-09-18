import { z } from "zod";

// https://github.com/chainapsis/keplr-wallet/blob/master/packages/types/src/currency.ts
/**
 * The currency that is supported on the chain natively.
 */
export const currencySchema = /* @__PURE__ */ z.object({
  coinDenom: z.string(),
  coinMinimalDenom: z.string(),
  coinDecimals: z.number(),
  coinGeckoId: z.string().optional(),
  coinImageUrl: z.string().optional(),
});

/**
 * The currency that is supported on the cosmwasm.
 * This should be the CW-20 that confirms the standard.
 * And, in this case, `coinMinimalDenom` must start with the type and contract address of currency such as "cw20:coral1vv6hruqu...3sfhwh:ukeplr".
 */
export const cW20CurrencySchema = /* @__PURE__ */ currencySchema.extend({
  type: z.literal("cw20"),
  contractAddress: z.string(),
});

export const secret20CurrencySchema = /* @__PURE__ */ currencySchema.extend({
  type: z.literal("secret20"),
  contractAddress: z.string(),
  viewingKey: z.string(),
});

/**
 * IBCCurrency is the currency that is sent from the other chain via IBC.
 * This will be handled as similar to the native currency.
 * But, this has more information abounr IBC channel and paths.
 */
export const ibcCurrencySchema = /* @__PURE__ */ currencySchema.extend({
  paths: z.array(
    z.object({
      portId: z.string(),
      channelId: z.string(),
      counterpartyChannelId: z.string().optional(),
      counterpartyPortId: z.string().optional(),
      clientChainId: z.string().optional(),
    }),
  ),
  originChainId: z.union([z.string(), z.undefined()]),
  originCurrency: z.union([currencySchema, cW20CurrencySchema, secret20CurrencySchema, z.undefined()]),
});

/**
 * Any type of currency that Kepler applications can support.
 */
export const appCurrencySchema = /* @__PURE__ */ z.union([
  currencySchema,
  cW20CurrencySchema,
  secret20CurrencySchema,
  ibcCurrencySchema,
]);

export const fiatCurrencySchema = /* @__PURE__ */ z.object({
  currency: z.string(),
  symbol: z.string(),
  maxDecimals: z.number(),
  locale: z.string(),
});

/**
 * This is used to set the fee of the transaction.
 * If this field is empty, it just use the default gas price step (low: 0.01, average: 0.025, high: 0.04).
 */
export const gasPriceStepsSchema = /* @__PURE__ */ z.object({
  low: z.number(),
  average: z.number(),
  high: z.number(),
});

export const feeCurrencySchema = /* @__PURE__ */ appCurrencySchema.and(
  z.object({
    gasPriceStep: gasPriceStepsSchema.optional(),
  }),
);
