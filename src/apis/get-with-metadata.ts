import { createInternalKey } from '@utils/internal-key.js'
import { isUndefined } from '@blackglory/prelude'
import { cache } from '@src/cache.js'
import { IMetadata } from '@src/contract.js'

export function getWithMetadata(namespace: string, key: string): {
  value: string
  metadata: IMetadata
} | null {
  const internalKey = createInternalKey(namespace, key)
  const item = cache.get(internalKey)
  if (isUndefined(item)) return null

  return {
    value: item.value.toString()
  , metadata: {
      updatedAt: item.updatedAt
    , timeToLive: item.timeToLive
    }
  }
}
