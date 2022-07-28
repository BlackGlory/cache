import { DiskCache } from 'extra-disk-cache'
import { DATA } from '@env/index.js'
import { assert } from '@blackglory/prelude'

export let cache: DiskCache

export async function openCache(): Promise<void> {
  cache = await DiskCache.create(DATA())
}

export function closeCache(): void {
  assert(cache, 'cache is not opened')
  cache.close()
}
