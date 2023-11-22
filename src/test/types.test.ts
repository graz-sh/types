/* eslint unused-imports/no-unused-vars: off */

import type { z } from "zod";

import type * as t from "../index";
import type * as s from "../zod";

type Assert<T, U> = T extends U ? true : false;
type TestAll<T extends true[]> = T["length"];

type Program = TestAll<
  [
    Assert<t.AppCurrency, z.infer<(typeof s)["appCurrencySchema"]>>,
    Assert<t.AssetList, z.infer<(typeof s)["assetListSchema"]>>,
    Assert<t.Asset, z.infer<(typeof s)["assetSchema"]>>,
    Assert<t.AssetType, z.infer<(typeof s)["assetTypeSchema"]>>,
    Assert<t.Bech32Config, z.infer<(typeof s)["bech32ConfigSchema"]>>,
    Assert<t.Bip44, z.infer<(typeof s)["bip44Schema"]>>,
    Assert<t.CW20Currency, z.infer<(typeof s)["cW20CurrencySchema"]>>,
    Assert<t.ChainInfo, z.infer<(typeof s)["chainInfoSchema"]>>,
    Assert<t.Chain, z.infer<(typeof s)["chainSchema"]>>,
    Assert<t.ChannelOrder, z.infer<(typeof s)["channelOrderSchema"]>>,
    Assert<t.ConsensusType, z.infer<(typeof s)["consensusTypeSchema"]>>,
    Assert<t.Currency, z.infer<(typeof s)["currencySchema"]>>,
    Assert<t.DenomUnit, z.infer<(typeof s)["denomUnitSchema"]>>,
    Assert<t.Endpoint, z.infer<(typeof s)["endpointSchema"]>>,
    Assert<t.Explorer, z.infer<(typeof s)["explorerSchema"]>>,
    Assert<t.ExtraCodec, z.infer<(typeof s)["extraCodecSchema"]>>,
    Assert<t.FeeCurrency, z.infer<(typeof s)["feeCurrencySchema"]>>,
    Assert<t.FeeToken, z.infer<(typeof s)["feeTokenSchema"]>>,
    Assert<t.FiatCurrency, z.infer<(typeof s)["fiatCurrencySchema"]>>,
    Assert<t.GasPriceSteps, z.infer<(typeof s)["gasPriceStepsSchema"]>>,
    Assert<t.IbcCurrency, z.infer<(typeof s)["ibcCurrencySchema"]>>,
    Assert<t.IbcCw20Transition, z.infer<(typeof s)["ibcCw20TransitionSchema"]>>,
    Assert<t.IbcCw20TransitionType, z.infer<(typeof s)["ibcCw20TransitionTypeSchema"]>>,
    Assert<t.IbcData, z.infer<(typeof s)["ibcDataSchema"]>>,
    Assert<t.IbcTransition, z.infer<(typeof s)["ibcTransitionSchema"]>>,
    Assert<t.IbcTransitionType, z.infer<(typeof s)["ibcTransitionTypeSchema"]>>,
    Assert<t.IcsType, z.infer<(typeof s)["icsTypeSchema"]>>,
    Assert<t.ImageType, z.infer<(typeof s)["imageTypeSchema"]>>,
    Assert<t.KeyAlgos, z.infer<(typeof s)["keyAlgosSchema"]>>,
    Assert<t.MemoKey, z.infer<(typeof s)["memoKeySchema"]>>,
    Assert<t.MemoKeys, z.infer<(typeof s)["memoKeysSchema"]>>,
    Assert<t.NetworkType, z.infer<(typeof s)["networkTypeSchema"]>>,
    Assert<t.NonIbcTransition, z.infer<(typeof s)["nonIbcTransitionSchema"]>>,
    Assert<t.NonIbcTransitionType, z.infer<(typeof s)["nonIbcTransitionTypeSchema"]>>,
    Assert<t.Peer, z.infer<(typeof s)["peerSchema"]>>,
    Assert<t.Secret20Currency, z.infer<(typeof s)["secret20CurrencySchema"]>>,
    Assert<t.StakingToken, z.infer<(typeof s)["stakingTokenSchema"]>>,
    Assert<t.Status, z.infer<(typeof s)["statusSchema"]>>,
    Assert<t.TransitionType, z.infer<(typeof s)["transitionTypeSchema"]>>,
  ]
>;
