import { view } from '@dao/cache.js'

export function has(namespace: string, key: string): boolean {
  return view.has({ namespace, key })
}
