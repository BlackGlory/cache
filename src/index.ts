import { go } from '@blackglory/prelude'
import { buildServer } from './server.js'
import { openCache, closeCache } from './cache.js'
import { youDied } from 'you-died'
import { PORT, HOST, CI } from '@env/index.js'


go(async () => {
  await openCache()
  youDied(async () => {
    await closeCache()
  })

  const server = buildServer()
  await server.listen(PORT(), HOST())
  if (CI()) process.exit()

  process.send?.('ready')
})
