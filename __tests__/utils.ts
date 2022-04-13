import { DATA } from '@env'
import { resetCache } from '@env/cache'
import { startServer } from '@src/server'
import { WebSocket } from 'ws'
import { createClient } from '@delight-rpc/websocket'
import { IAPI } from '@src/contract'
import { openCache, closeCache } from '@src/cache'
import { remove } from 'extra-filesystem'
import { waitForEventEmitter } from '@blackglory/wait-for'

let closeServer: ReturnType<typeof startServer>
let address: string

export function getAddress() {
  return address
}

export async function startService() {
  await initializeServer()
  closeServer = startServer('localhost', 8080)
  address = 'ws://localhost:8080'
}

export async function stopService() {
  await closeServer()
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

export async function buildClient() {
  const ws = new WebSocket(address)
  await waitForEventEmitter(ws, 'open')
  const [client] = createClient<IAPI>(ws)
  return client
}
