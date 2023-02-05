import { map, uniq, toArray } from 'iterable-operator'
import { pipe } from 'extra-utils'
import { view } from '@dao/cache.js'

export function getAllNamespaces(): string[] {
  return pipe(
    view.keys()
  , iter => map(iter, x => x.namespace)
  , iter => uniq(iter)
  , iter => toArray(iter)
  )
}
