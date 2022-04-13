import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function set(
  namespace: string
, key: string
, value: string
, timeToLive: number | null /* ms */
, timeBeforeDeletion: number | null /* ms */
): Promise<null> {
  await cache.set(
    createInternalKey(namespace, key)
  , Buffer.from(value)
  , Date.now()
  , timeToLive ?? Infinity
  , timeBeforeDeletion ?? Infinity
  )
  return null
}
