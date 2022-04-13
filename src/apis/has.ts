import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function has(namespace: string, key: string): Promise<boolean> {
  return await cache.hasData(createInternalKey(namespace, key))
}
