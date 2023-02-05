import { isUndefined } from '@blackglory/prelude'
import { view } from '@dao/cache.js'
import { IMetadata } from '@src/contract.js'

export function getItemWithMetadata(namespace: string, key: string): {
  value: string
  metadata: IMetadata
} | null {
  const item = view.getWithMetadata({ namespace, key })

  if (isUndefined(item)) {
    return null
  } else {
    return {
      value: item.value
    , metadata: {
        updatedAt: item.updatedAt
      , timeToLive: item.timeToLive
      }
    }
  }
}
