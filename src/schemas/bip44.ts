import { z } from "zod";

export const bip44Schema = /* @__PURE__ */ z.object({
  coinType: z.number(),
});
