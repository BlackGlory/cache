import { DATA } from '@env'
import { resetCache } from '@env/cache'
import { buildServer } from '@src/server'
import { createClient } from '@delight-rpc/http-client'
import { IAPI } from '@src/contract'
import { openCache, closeCache } from '@src/cache'
import { remove } from 'extra-filesystem'
import ms from 'ms'

let server: ReturnType<typeof buildServer>
let address: string

export function getAddress() {
  return address
}

export async function startService() {
  await initializeServer()
  server = buildServer()
  address = await server.listen(0)
}

export async function stopService() {
  await server.close()
  await clearServer()
  resetEnvironment()
}

async function initializeServer() {
  await openCache()
}

async function clearServer() {
  await closeCache()
  await remove(DATA())
}

async function resetEnvironment() {
  // reset memoize
  resetCache()
}

export function buildClient() {
  return createClient<IAPI>(
    {
      server: address
    , keepalive: true
    , timeout: ms('30s')
    }
  )
}
