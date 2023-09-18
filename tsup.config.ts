import { defineConfig } from "tsup";

export default defineConfig({
  cjsInterop: true,
  clean: true,
  dts: true,
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
  tsconfig: "./tsconfig.build.json",
});
