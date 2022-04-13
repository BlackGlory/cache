import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { extractFromInternalKey } from '@utils/internal-key.js'
import { IStats } from '@src/contract.js'
import { cache } from '@src/cache.js'

export async function stats(namespace: string): Promise<IStats> {
  const internalKeys = await cache.keysData()
  const items = new IterableOperator(internalKeys)
    .map(extractFromInternalKey)
    .filter(x => x.namespace === namespace)
    .count()
  return { namespace, items }
}
