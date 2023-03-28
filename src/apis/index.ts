import { ImplementationOf } from 'delight-rpc'
import { IAPI } from '@src/contract.js'
import { hasItem } from './has-item.js'
import { getItem } from './get-item.js'
import { getItemValue } from './get-item-value.js'
import { setItem } from './set-item.js'
import { removeItem } from './remove-item.js'
import { clearItemsByNamespace } from './clear-items-by-namespace.js'
import { getAllItemKeys } from './get-all-item-keys.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { getNamespaceStatistics } from './get-namespace-statistics.js'

export const API: ImplementationOf<IAPI> = {
  getNamespaceStatistics
, getAllNamespaces
, getAllItemKeys
, hasItem
, getItem
, getItemValue
, setItem
, removeItem
, clearItemsByNamespace
}
