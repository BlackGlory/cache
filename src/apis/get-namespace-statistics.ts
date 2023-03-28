import { filter, count } from 'iterable-operator'
import { pipe } from 'extra-utils'
import { INamespaceStatistics } from '@src/contract.js'
import { view } from '@dao/cache.js'

export function getNamespaceStatistics(namespace: string): INamespaceStatistics {
  const items = pipe(
    view.keys()
  , iter => filter(iter, x => x.namespace === namespace)
  , iter => count(iter)
  )

  return { items }
}
