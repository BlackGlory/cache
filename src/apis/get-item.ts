import { isUndefined, JSONValue } from '@blackglory/prelude'
import { view } from '@dao/cache.js'
import { IItemMetadata } from '@src/contract.js'

export function getItem(namespace: string, key: string): {
  value: JSONValue
  metadata: IItemMetadata
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
