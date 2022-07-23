import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: 'lib/index.js'
, output: {
    file: 'dist/index.cjs'
  , format: 'cjs'
  }
, plugins: [
    nodeResolve({ preferBuiltins: true })
  , commonjs()
  ]
, external: [
    'better-sqlite3'
  , 'level'
  ]
}
