import { fileURLToPath } from 'url'

export default {
  target: 'node'
, mode: 'none'
, node: {
    global: true,
    __filename: true,
    __dirname: true,
  }
, entry: './lib/index.js'
, module: {
    parser: {
      javascript: {
        url: false
      }
    }
  }
, output: {
    path: fileURLToPath(new URL('dist', import.meta.url))
  , filename: 'index.cjs'
  }
, externals: {
    'better-sqlite3': 'commonjs better-sqlite3'
  , '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd'
  , 'bufferutil': 'commonjs bufferutil'
  , 'utf-8-validate': 'commonjs utf-8-validate'
  }
}
