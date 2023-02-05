import { view } from '@dao/cache.js'

export function hasItem(namespace: string, key: string): boolean {
  return view.has({ namespace, key })
}
