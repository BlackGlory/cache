import { createInternalKey } from '@utils/internal-key.js'
import { cache } from '@src/cache.js'

export function set(
  namespace: string
, key: string
, value: string
, timeToLive: number | null /* ms */
): null {
  cache.set(
    createInternalKey(namespace, key)
  , Buffer.from(value)
  , Date.now()
  , timeToLive
  )
  return null
}
