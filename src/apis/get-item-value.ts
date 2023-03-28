import { view } from '@dao/cache.js'
import { JSONValue } from 'justypes'

export function getItemValue(namespace: string, key: string): JSONValue | null {
  const item = view.get({ namespace, key })
  return item ?? null
}
