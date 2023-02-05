import { view } from '@dao/cache.js'
import { pipe } from 'extra-utils'
import { filter, map, toArray } from 'iterable-operator'

export function getAllItemKeys(namespace: string): string[] {
  return pipe(
    view.keys()
  , iter => filter(iter, x => x.namespace === namespace)
  , iter => map(iter, x => x.key)
  , iter => toArray(iter)
  )
}
