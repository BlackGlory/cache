import { WS_HEARTBEAT_INTERVAL } from '@env/index.js'
import { API } from './apis/index.js'
import path from 'path'
import appRoot from 'app-root-path'
import { readJSONFileSync } from 'extra-filesystem'
import { createServer } from '@delight-rpc/websocket'
import { WebSocket, WebSocketServer } from 'ws'
import { Destructor } from 'extra-defer'
import { setDynamicTimeoutLoop } from 'extra-timers'

const pkg = readJSONFileSync<{ version: `${number}.${number}.${number}` }>(
  path.join(appRoot.path, 'package.json')
)

export function startServer(host: string, port: number): () => Promise<void> {
  const sockets = new Set<WebSocket>()

  const server = new WebSocketServer({ host, port })
  server.on('connection', async socket => {
    const destructor = new Destructor()

    sockets.add(socket)
    destructor.defer(() => sockets.delete(socket))

    const close = createServer(API, socket, undefined, pkg.version)
    destructor.defer(() => close())

    const cancelHeartbeatTimer: (() => void) | null = WS_HEARTBEAT_INTERVAL() > 0
      ? setDynamicTimeoutLoop(WS_HEARTBEAT_INTERVAL(), () => socket.ping())
      : null
    destructor.defer(() => cancelHeartbeatTimer?.())

    socket.once('close', async () => {
      await destructor.execute()
    })
  })

  return () => new Promise<void>((resolve, reject) => {
    server.close(err => {
      if (err) return reject(err)
      resolve()
    })
    sockets.forEach(socket => socket.close())
  })
}
