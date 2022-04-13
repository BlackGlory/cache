import { IAPI } from '@src/contract.js'
import { has } from './has.js'
import { get } from './get.js'
import { set } from './set.js'
import { del } from './del.js'
import { clear } from './clear.js'
import { getAllItemKeys } from './get-all-item-keys.js'
import { getAllNamespaces } from './get-all-namespaces.js'
import { stats } from './stats.js'

export const API: IAPI = {
  has
, get
, set
, del
, clear
, getAllItemKeys
, getAllNamespaces
, stats
}
