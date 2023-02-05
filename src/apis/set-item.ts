import { view } from '@dao/cache.js'

export function setItem(
  namespace: string
, key: string
, value: string
, timeToLive: number | null /* ms */
): null {
  view.set({ namespace, key }, value, timeToLive)
  return null
}
