import { createInternalKey } from '@utils/internal-key.js'
import { isUndefined, isPositiveInfinity } from '@blackglory/prelude'
import { cache } from '@src/cache.js'
import { IMetadata } from '@src/contract.js'

export async function getWithMetadata(namespace: string, key: string): Promise<{
  value: string
  metadata: IMetadata 
} | null> {
  const internalKey = createInternalKey(namespace, key)
  const buffer = await cache.getData(internalKey)
  const metadata = cache.getMetadata(internalKey)
  if (isUndefined(buffer) || isUndefined(metadata)) return null
  return {
    value: buffer.toString()
  , metadata: {
      updatedAt: metadata.updatedAt
    , timeToLive:
        isPositiveInfinity(metadata.timeToLive)
        ? null
        : metadata.timeToLive
    , timeBeforeDeletion:
        isPositiveInfinity(metadata.timeBeforeDeletion)
        ? null
        : metadata.timeBeforeDeletion
    }
  }
}
