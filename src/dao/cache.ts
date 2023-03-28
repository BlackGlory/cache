import { DiskCache, DiskCacheView } from 'extra-disk-cache'
import { DATA, NODE_ENV, NodeEnv } from '@env/index.js'
import { assert, JSONValue } from '@blackglory/prelude'
import { ensureDirSync } from 'extra-filesystem'
import { fromInternalKey, toInternalKey } from '@utils/internal-key.js'
import path from 'path'

export let cache: DiskCache
export let view: DiskCacheView<{ namespace: string, key: string }, JSONValue>

export async function openCache(): Promise<void> {
  cache = await DiskCache.create(getDataFilename())
  view = new DiskCacheView<{ namespace: string, key: string }, JSONValue>(
    cache
  , {
      toString: ({ namespace, key }) => toInternalKey(namespace, key)
    , fromString: (key: string) => fromInternalKey(key)
    }
  , {
      toBuffer: (value: JSONValue) => Buffer.from(JSON.stringify(value))
    , fromBuffer: (buffer: Buffer) => JSON.parse(buffer.toString()) as JSONValue
    }
  )
}

function getDataFilename(): string | undefined {
  switch (NODE_ENV()) {
    case NodeEnv.Test: return undefined
    default: {
      const dataPath = DATA()
      const dataFilename = path.join(dataPath, 'data.db')
      ensureDirSync(dataPath)
      return dataFilename
    }
  }
}

export function closeCache(): void {
  assert(cache, 'cache is not opened')
  cache.close()
}
