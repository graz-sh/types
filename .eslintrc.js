// @ts-check

const { extendEslint } = require("@graz-sh/style-guide-core");

module.exports = extendEslint(["browser-node", "typescript", "tsup"], {
  ignorePatterns: ["dist/"],
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
  },
  root: true,
});
