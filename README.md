# @graz-sh/types

[![npm/v](https://badgen.net/npm/v/@graz-sh/types)](https://www.npmjs.com/package/@graz-sh/types)
[![npm/dt](https://badgen.net/npm/dt/@graz-sh/types)](https://www.npmjs.com/package/@graz-sh/types)
[![stars](https://badgen.net/github/stars/graz-sh/types)](https://github.com/graz-sh/types)

Cosmos, Keplr, and Graz related type definitions

## Installing

```bash
pnpm install @graz-sh/types long
```

## Example Usage

```ts
import { Chain, AssetList, ... } from "@graz-sh/types";
import { convertChainToChainInfo } from "@graz-sh/types/convert";
import { defineChain, defineChainInfo, ... } from "@graz-sh/types/define";
import { ChainInfo, ... } from "@graz-sh/types/keplr";
```

## FAQs

**Why hard fork `@keplr-wallet/types` sources?**

[`@keplr-wallet/types`](https://www.npmjs.com/package/@keplr-wallet/types?activeTab=dependencies) uses [`long`](https://npm.im/long) package as a direct dependency, whereas this package marks it as a peer dependency, so you need to install it alongside `@graz-sh/types`.

## License

- Sources and types: [MIT License, Copyright (c) 2023 Graz](./LICENSE)
- Keplr types: [Apache 2.0, Copyright (c) 2020 Chainapsis, Inc.](./src/keplr/LICENSE)
