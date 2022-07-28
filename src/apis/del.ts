import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export function del(namespace: string, key: string): null {
  cache.delete(createInternalKey(namespace, key))
  return null
}
