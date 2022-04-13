import { each } from 'extra-promise'
import { extractFromInternalKey } from '@utils/internal-key.js'
import { IterableOperator } from 'iterable-operator/lib/es2018/style/chaining/index.js'
import { cache } from '@src/cache.js'

export async function clear(namespace: string): Promise<null> {
  const internalKeys = await cache.keysData()
  const items = new IterableOperator(internalKeys)
    .filter(x => extractFromInternalKey(x).namespace === namespace)
  await each(items, async internalKey => cache.delete(internalKey))
  return null
}
