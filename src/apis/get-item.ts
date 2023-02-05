import { view } from '@dao/cache.js'

export function getItem(namespace: string, key: string): string | null {
  const item = view.get({ namespace, key })
  return item ?? null
}
