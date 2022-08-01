import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { view } from '@src/cache.js'

export function getAllNamespaces(): string[] {
  const keys = view.keys()

  return new IterableOperator(keys)
    .map(x => x.namespace)
    .uniq()
    .toArray()
}
