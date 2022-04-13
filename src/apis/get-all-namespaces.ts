import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { extractFromInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function getAllNamespaces(): Promise<string[]> {
  const internalKeys = await cache.keysData()
  return new IterableOperator(internalKeys)
    .map(x => extractFromInternalKey(x).namespace)
    .uniq()
    .toArray()
}
