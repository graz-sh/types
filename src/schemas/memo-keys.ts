import { z } from "zod";

export const memoKeySchema = /* @__PURE__ */ z.record(z.unknown()).and(
  z.object({
    key: z.string(),
    description: z.string(),
    git_repo: z.string(),
    memo: z.record(z.unknown()),
  }),
);

export const memoKeysSchema = /* @__PURE__ */ z.object({
  $schema: z.string().optional(),
  memo_keys: z.array(memoKeySchema),
});
