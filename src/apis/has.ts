import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export function has(namespace: string, key: string): boolean {
  return cache.has(createInternalKey(namespace, key))
}
