import { extractFromInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'
import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'

export function getAllItemKeys(namespace: string): string[] {
  const internalKeys = cache.keys()
  return new IterableOperator(internalKeys)
    .map(extractFromInternalKey)
    .filter(x => x.namespace === namespace)
    .map(x => x.key)
    .toArray()
}
