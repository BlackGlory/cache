import { ImplementationOf } from 'delight-rpc'
import { IAPI } from '@src/contract.js'
import { hasItem } from './has-item.js'
import { getItem } from './get-item.js'
import { getItemWithMetadata } from './get-item-with-metadata.js'
import { setItem } from './set-item.js'
import { removeItem } from './remove-item.js'
import { clearItemsByNamespace } from './clear-items-by-namespace.js'
import { getAllItemKeys } from './get-all-item-keys.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { stats } from './stats.js'

export const API: ImplementationOf<IAPI> = {
  stats
, getAllNamespaces
, getAllItemKeys
, hasItem
, getItem
, getItemWithMetadata
, setItem
, removeItem
, clearItemsByNamespace
}
