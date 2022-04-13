import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export async function set(
  namespace: string
, key: string
, payload: string
, timeToLive: number /* ms */
, timeBeforeDeletion: number /* ms */
): Promise<null> {
  await cache.set(
    createInternalKey(namespace, key)
  , Buffer.from(payload)
  , Date.now()
  , timeToLive
  , timeBeforeDeletion
  )
  return null
}
