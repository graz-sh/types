// https://github.com/cosmos/chain-registry/blob/master/memo_keys.schema.json
// https://transform.tools/json-schema-to-typescript

export interface MemoKeys {
  $schema?: string;
  memo_keys: MemoKey[];
}

export interface MemoKey {
  key: string;
  description: string;
  git_repo: string;
  memo: Record<string, unknown>;
  [k: string]: unknown;
}
