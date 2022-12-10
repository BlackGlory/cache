import { filter, count } from 'iterable-operator'
import { pipe } from 'extra-utils'
import { IStats } from '@src/contract.js'
import { view } from '@src/cache.js'

export function stats(namespace: string): IStats {
  const items = pipe(
    view.keys()
  , iter => filter(iter, x => x.namespace === namespace)
  , iter => count(iter)
  )

  return { namespace, items }
}
