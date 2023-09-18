import { z } from "zod";

export const imageTypeSchema = /* @__PURE__ */ z.object({
  png: z.string().optional(),
  svg: z.string().optional(),
  theme: z
    .object({
      primary_color_hex: z.string().optional(),
    })
    .optional(),
});

export const statusSchema = /* @__PURE__ */ z.union([z.literal("live"), z.literal("upcoming"), z.literal("killed")]);
