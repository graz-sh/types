import type { Asset, AssetList } from "./assetlist";
import type { Bech32Config } from "./bech32";
import type { Chain } from "./chain";
import type { ChainInfo } from "./keplr/chain-info";
import type { Currency, FeeCurrency } from "./keplr/currency";
import { detectChainFeatures, getChainGasPriceSteps } from "./utils";

type Args = {
  getRestEndpoint?: (chain: Chain) => string;
  getRpcEndpoint?: (chain: Chain) => string;
} & (
  | { chain: Chain; assetlists: AssetList[] }
  | { chain: Chain; assetlist: AssetList }
  | { chain: Chain; assets: Asset[] }
);

export const chainToChainInfo = (args: Args): ChainInfo => {
  const {
    chain,
    getRestEndpoint = ({ apis }) => apis?.rest?.[0]?.address ?? "",
    getRpcEndpoint = ({ apis }) => apis?.rpc?.[0]?.address ?? "",
  } = args;

  let assets: Asset[] = [];
  if ("assetlists" in args && Array.isArray(args.assetlists)) {
    assets = args.assetlists.find((asset) => asset.chain_name === chain.chain_name)?.assets || [];
  }
  if ("assetlist" in args && Array.isArray(args.assetlist.assets)) {
    assets = args.assetlist.assets;
  }
  if ("assets" in args && Array.isArray(args.assets)) {
    assets = args.assets;
  }

  const currencies = assets.map((currency): Currency => {
    const denomUnit = currency.denom_units.reduce((acc, val) => (val.exponent > acc.exponent ? val : acc));
    return {
      coinDenom: currency.symbol,
      coinMinimalDenom: currency.base,
      coinDecimals: denomUnit.exponent,
      coinGeckoId: currency.coingecko_id,
      coinImageUrl: currency.logo_URIs?.svg ?? currency.logo_URIs?.png,
    };
  });

  const firstCurrency = currencies[0];

  if (!firstCurrency) throw new Error(`chain '${chain.chain_name}' has no assets`);

  const stakingDenoms = chain.staking?.staking_tokens.map((stakingToken) => stakingToken.denom) || [];

  const stakeCurrency = currencies.find((currency) => stakingDenoms.includes(currency.coinDenom)) ?? firstCurrency;

  const gasPriceSteps = getChainGasPriceSteps(chain);

  const feeDenoms = chain.fees?.fee_tokens.map<string>((feeToken) => feeToken.denom) || [];

  const feeCurrencies = currencies
    .filter((currency) => feeDenoms.includes(currency.coinMinimalDenom))
    .map((feeCurrency): FeeCurrency => {
      if (!(feeCurrency.coinMinimalDenom in gasPriceSteps)) return feeCurrency;
      const gasPriceStep = gasPriceSteps[feeCurrency.coinMinimalDenom];
      return { ...feeCurrency, gasPriceStep };
    });

  const feeCurrenciesDefault: FeeCurrency[] = currencies
    .filter((currency) => stakeCurrency.coinDenom === currency.coinDenom)
    .map((feeCurrency) => {
      if (!(feeCurrency.coinMinimalDenom in gasPriceSteps)) return feeCurrency;
      const gasPriceStep = gasPriceSteps[feeCurrency.coinMinimalDenom];
      return { ...feeCurrency, gasPriceStep };
    });

  const features = detectChainFeatures(chain);

  const chainInfo: ChainInfo = {
    rpc: getRpcEndpoint(chain),
    rest: getRestEndpoint(chain),
    chainId: chain.chain_id,
    chainName: chain.pretty_name || chain.chain_name,
    bip44: {
      coinType: chain.slip44 || 118,
    },
    bech32Config: chain.bech32_config || prefixToBech32Config(chain.bech32_prefix),
    currencies,
    stakeCurrency,
    feeCurrencies: feeCurrencies.length !== 0 ? feeCurrencies : feeCurrenciesDefault,
    features,
  };

  return chainInfo;
};

export const prefixToBech32Config = (
  prefix: string,
  validatorPrefix = "val",
  consensusPrefix = "cons",
  publicPrefix = "pub",
  operatorPrefix = "oper",
): Bech32Config => ({
  bech32PrefixAccAddr: prefix,
  bech32PrefixAccPub: prefix + publicPrefix,
  bech32PrefixValAddr: prefix + validatorPrefix + operatorPrefix,
  bech32PrefixValPub: prefix + validatorPrefix + operatorPrefix + publicPrefix,
  bech32PrefixConsAddr: prefix + validatorPrefix + consensusPrefix,
  bech32PrefixConsPub: prefix + validatorPrefix + consensusPrefix + publicPrefix,
});
