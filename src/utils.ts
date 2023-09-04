import * as semver from "semver";

import type { Chain } from "./chain";
import type { GasPriceSteps } from "./keplr";

export const detectChainFeatures = (chain: Chain) => {
  const features: string[] = [];
  try {
    const version = sanitizeSemver(chain.codebase?.cosmos_sdk_version ?? "0.4");
    if (semver.satisfies(version, ">=0.4")) features.push("stargate");
    if (semver.satisfies(version, ">=0.43")) features.push("no-legacy-stdTx");
    if (semver.satisfies(version, ">=0.45")) features.push("ibc-go");
    if (chain.codebase?.cosmwasm_enabled) {
      features.push("cosmwasm");
      const wasmVer = sanitizeSemver(chain.codebase.cosmwasm_version ?? "0.24");
      if (semver.satisfies(wasmVer, ">=0.24")) features.push("wasmd_0.24+");
    }
    features.push("ibc-transfer"); // until further notice, assume 'ibc-transfer'
  } catch {
    //
  }
  return features;
};

export const getChainGasPriceSteps = (chain: Chain) => {
  /** @see {@link GasPriceSteps} */
  const gasPriceSteps: Record<string, GasPriceSteps> = {};

  for (const feeToken of chain.fees?.fee_tokens || []) {
    gasPriceSteps[feeToken.denom] = {
      low: feeToken.low_gas_price ?? 0.01,
      average: feeToken.average_gas_price ?? 0.025,
      high: feeToken.high_gas_price ?? 0.04,
    };
  }

  return gasPriceSteps;
};

// https://github.com/sindresorhus/semver-truncate/blob/main/index.js
export const sanitizeSemver = (str: string) => {
  // eslint-disable-next-line no-param-reassign
  str = str.replace(/^.+@/, "");

  const parsed = semver.parse(str, { loose: true });
  if (!parsed) throw new Error(`unable to parse semver: ${str}`);

  // @ts-expect-error force clear semver params
  parsed.build = "";
  // @ts-expect-error force clear semver params
  parsed.prerelease = "";

  return parsed.format();
};
