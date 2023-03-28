import { view } from '@dao/cache.js'
import { JSONValue } from 'justypes'

export function setItem(
  namespace: string
, key: string
, value: JSONValue
, timeToLive: number | null /* ms */
): null {
  view.set({ namespace, key }, value, timeToLive)
  return null
}
