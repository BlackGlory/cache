import { fromInternalKey } from '@utils/internal-key.js'
import { toArray } from 'iterable-operator'
import { cache } from '@dao/cache.js'

export function clear(namespace: string): null {
  const internalKeys = toArray(cache.keys())

  internalKeys
    .filter(x => fromInternalKey(x).namespace === namespace)
    .forEach(x => cache.delete(x))

  return null
}
