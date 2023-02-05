import { view } from '@dao/cache.js'

export function removeItem(namespace: string, key: string): null {
  view.delete({ namespace, key })
  return null
}
