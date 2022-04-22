import { go } from '@blackglory/prelude'
import { startServer } from './server.js'
import { openCache, closeCache } from './cache.js'
import { youDied } from 'you-died'
import { PORT, HOST, CI } from '@env/index.js'

go(async () => {
  await openCache()
  youDied(closeCache)

  const closeServer = startServer(HOST(), PORT())
  youDied(closeServer)
  if (CI()) process.exit()

  process.send?.('ready')
})
