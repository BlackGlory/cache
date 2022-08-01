import { isUndefined } from '@blackglory/prelude'
import { view } from '@src/cache.js'

export function get(namespace: string, key: string): string | null {
  const item = view.get({ namespace, key })
  if (isUndefined(item)) return null

  return item.value
}
