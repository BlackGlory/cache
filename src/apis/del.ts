import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function del(namespace: string, key: string): Promise<null> {
  await cache.delete(createInternalKey(namespace, key))
  return null
}
