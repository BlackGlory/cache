import { DiskCache } from 'extra-disk-cache'
import { DATA } from '@env/index.js'
import { assert } from '@blackglory/prelude'

export let cache: DiskCache

export async function openCache(): Promise<void> {
  cache = await DiskCache.create(DATA())
}

export async function closeCache(): Promise<void> {
  assert(cache, 'cache is not opened')
  await cache.close()
}
