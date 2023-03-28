import { JSONValue } from 'justypes'

export interface INamespaceStatistics {
  items: number
}

export interface IItemMetadata {
  updatedAt: number
  timeToLive: number | null
}

export interface IAPI {
  getAllNamespaces(): string[]
  getAllItemKeys(namespace: string): string[]

  getNamespaceStatistics(namespace: string): INamespaceStatistics

  hasItem(namespace: string, itemKey: string): boolean

  getItem(namespace: string, itemKey: string): {
    value: JSONValue
    metadata: IItemMetadata
  } | null
  getItemValue(namespace: string, itemKey: string): JSONValue | null

  setItem(
    namespace: string
  , itemKey: string
  , itemValue: JSONValue
  , timeToLive: number | null /* ms */
  ): null

  removeItem(namespace: string, itemKey: string): null

  clearItemsByNamespace(namespace: string): null
}
