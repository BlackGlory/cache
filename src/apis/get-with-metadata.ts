import { isUndefined } from '@blackglory/prelude'
import { view } from '@src/cache.js'
import { IMetadata } from '@src/contract.js'

export function getWithMetadata(namespace: string, key: string): {
  value: string
  metadata: IMetadata
} | null {
  const item = view.get({ namespace, key })
  if (isUndefined(item)) return null

  return {
    value: item.value
  , metadata: {
      updatedAt: item.updatedAt
    , timeToLive: item.timeToLive
    }
  }
}
