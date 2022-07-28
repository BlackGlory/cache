import { go } from '@blackglory/prelude'
import { startServer } from './server.js'
import { openCache, closeCache } from './cache.js'
import { youDied } from 'you-died'
import { PORT, HOST, NODE_ENV, NodeEnv } from '@env/index.js'
import { writeHeapSnapshot } from 'v8'

go(async () => {
  process.on('SIGUSR1', () => {
    console.log('memory usage', process.memoryUsage())
    writeHeapSnapshot()
  })

  await openCache()
  youDied(closeCache)

  const closeServer = startServer(HOST(), PORT())
  youDied(closeServer)
  if (NODE_ENV() === NodeEnv.Test) process.exit()

  process.send?.('ready')
})
