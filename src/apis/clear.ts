import { extractFromInternalKey } from '@utils/internal-key.js'
import { toArray } from 'iterable-operator'
import { cache } from '@src/cache.js'

export function clear(namespace: string): null {
  const internalKeys = toArray(cache.keys())

  internalKeys
    .filter(x => extractFromInternalKey(x).namespace === namespace)
    .forEach(x => cache.delete(x))

  return null
}
