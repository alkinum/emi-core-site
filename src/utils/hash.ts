import { createSHA256 } from 'hash-wasm';

export const sha256 = async (str: string) => {
  const hash = await createSHA256();
  hash.update(str);
  return hash.digest('hex');
};
