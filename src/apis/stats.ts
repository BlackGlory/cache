import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { IStats } from '@src/contract.js'
import { view } from '@src/cache.js'

export function stats(namespace: string): IStats {
  const keys = view.keys()

  const items = new IterableOperator(keys)
    .filter(x => x.namespace === namespace)
    .count()

  return { namespace, items }
}
