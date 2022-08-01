import { view } from '@src/cache.js'

export function del(namespace: string, key: string): null {
  view.delete({ namespace, key })
  return null
}
