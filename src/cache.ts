import { DiskCache, DiskCacheView } from 'extra-disk-cache'
import { DATA } from '@env/index.js'
import { assert } from '@blackglory/prelude'
import { ensureDirSync } from 'extra-filesystem'
import { fromInternalKey, toInternalKey } from '@utils/internal-key.js'
import path from 'path'

export let cache: DiskCache
export let view: DiskCacheView<{ namespace: string, key: string }, string>

export async function openCache(): Promise<void> {
  const dataPath = DATA()
  const dataFilename = path.join(dataPath, 'data.db')
  ensureDirSync(dataPath)

  cache = await DiskCache.create(dataFilename)
  view = new DiskCacheView<{ namespace: string, key: string }, string>(
    cache
  , {
      toString: ({ namespace, key }) => toInternalKey(namespace, key)
    , fromString: (key: string) => fromInternalKey(key)
    }
  , {
      toBuffer: (value: string) => Buffer.from(value)
    , fromBuffer: (buffer: Buffer) => buffer.toString()
    }
  )
}

export function closeCache(): void {
  assert(cache, 'cache is not opened')
  cache.close()
}
