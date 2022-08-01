import { view } from '@src/cache.js'
import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'

export function getAllItemKeys(namespace: string): string[] {
  const keys = view.keys()

  return new IterableOperator(keys)
    .filter(x => x.namespace === namespace)
    .map(x => x.key)
    .toArray()
}
