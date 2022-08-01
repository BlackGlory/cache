import { createInternalKey } from '@utils/internal-key.js'
import { isUndefined } from '@blackglory/prelude'
import { cache } from '@src/cache.js'

export function get(namespace: string, key: string): string | null {
  const internalKey = createInternalKey(namespace, key)
  const item = cache.get(internalKey)
  if (isUndefined(item)) return null
  return item.value.toString()
}
