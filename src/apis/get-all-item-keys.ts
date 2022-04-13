import { extractFromInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function getAllItemKeys(namespace: string): Promise<string[]> {
  const internalKeys = await cache.keysData()
  return internalKeys
    .map(extractFromInternalKey)
    .filter(x => x.namespace === namespace)
    .map(x => x.key)
}
