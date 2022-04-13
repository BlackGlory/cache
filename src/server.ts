import { NODE_ENV, NodeEnv } from '@env/index.js'
import { API } from './apis/index.js'
import path from 'path'
import appRoot from 'app-root-path'
import { readJSONFileSync } from 'extra-filesystem'
import { createServer, Level } from '@delight-rpc/http-server'

const pkg = readJSONFileSync<{ version: `${number}.${number}.${number}` }>(
  path.join(appRoot.path, 'package.json')
)

export function buildServer() {
  return createServer(API, {
    loggerLevel: NODE_ENV() === NodeEnv.Test ? Level.None : Level.Info
  , healthCheckEndpoint: true
  , version: pkg.version
  })
}
