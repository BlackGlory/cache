import { resetCache } from '@env/cache.js'
import { startServer } from '@src/server.js'
import { WebSocket } from 'ws'
import { createClient } from '@delight-rpc/websocket'
import { IAPI } from '@src/contract.js'
import { openCache, closeCache } from '@src/cache.js'
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
  closeCache()
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
