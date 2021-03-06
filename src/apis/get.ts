import { createInternalKey } from '@utils/internal-key.js'
import { isUndefined } from '@blackglory/prelude'
import { cache } from '@src/cache.js'

export async function get(namespace: string, keyd: string): Promise<string | null> {
  const internalKey = createInternalKey(namespace, keyd)
  const buffer = await cache.getData(internalKey)
  if (isUndefined(buffer)) return null
  return buffer.toString()
}
