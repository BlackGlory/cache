import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { extractFromInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export function getAllNamespaces(): string[] {
  const internalKeys = cache.keys()
  return new IterableOperator(internalKeys)
    .map(x => extractFromInternalKey(x).namespace)
    .uniq()
    .toArray()
}
