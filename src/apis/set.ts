import { view } from '@src/cache.js'

export function set(
  namespace: string
, key: string
, value: string
, timeToLive: number | null /* ms */
): null {
  view.set({ namespace, key }, value, timeToLive)
  return null
}
