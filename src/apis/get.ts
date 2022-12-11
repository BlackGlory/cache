import { view } from '@src/cache.js'

export function get(namespace: string, key: string): string | null {
  const item = view.get({ namespace, key })
  return item ?? null
}
