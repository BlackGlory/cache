import { view } from '@src/cache.js'

export function has(namespace: string, key: string): boolean {
  return view.has({ namespace, key })
}
