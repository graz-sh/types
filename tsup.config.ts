import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  cjsInterop: true,
  entry: [
    "src/convert.ts",
    "src/define.ts",
    "src/index.ts",
    "src/keplr.ts",
    //
  ],
  format: ["cjs"],
  minify: true,
  splitting: true,
  treeshake: true,
});
