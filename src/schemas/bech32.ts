import { z } from "zod";

export const bech32ConfigSchema = /* @__PURE__ */ z.object({
  bech32PrefixAccAddr: z.string(),
  bech32PrefixAccPub: z.string(),
  bech32PrefixValAddr: z.string(),
  bech32PrefixValPub: z.string(),
  bech32PrefixConsAddr: z.string(),
  bech32PrefixConsPub: z.string(),
});
