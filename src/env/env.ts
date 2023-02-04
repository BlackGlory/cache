import { ValueGetter } from 'value-getter'
import { assert, isNumber } from '@blackglory/prelude'
import { Getter } from 'justypes'
import { getCache } from './cache.js'
import { appRootPath } from '@utils/paths.js'
import path from 'path'

export enum NodeEnv {
  Test
, Development
, Production
}

export const NODE_ENV: Getter<NodeEnv | undefined> =
  env('NODE_ENV')
    .convert(val => {
      switch (val) {
        case 'test': return NodeEnv.Test
        case 'development': return NodeEnv.Development
        case 'production': return NodeEnv.Production
      }
    })
    .memoize(getCache)
    .get()

export const DATA: Getter<string> =
  env('CACHE_DATA')
    .default(path.join(appRootPath, 'data'))
    .memoize(getCache)
    .get()

export const HOST: Getter<string> =
  env('CACHE_HOST')
    .default('localhost')
    .memoize(getCache)
    .get()

export const PORT: Getter<number> =
  env('CACHE_PORT')
    .convert(toInteger)
    .default(8080)
    .memoize(getCache)
    .get()

export const WS_HEARTBEAT_INTERVAL: Getter<number> =
  env('CACHE_WS_HEARTBEAT_INTERVAL')
    .convert(toInteger)
    .default(0)
    .assert(shouldBePositiveOrZero)
    .memoize(getCache)
    .get()

function env(name: string): ValueGetter<string | undefined> {
  return new ValueGetter(name, () => process.env[name])
}

function toBool(val: string | boolean | undefined): boolean | undefined {
  if (val) return val === 'true'
  return false
}

function toInteger(val: string | number | undefined ): number | undefined {
  if (isNumber(val)) return val
  if (val) return Number.parseInt(val, 10)
}

function shouldBePositiveOrZero(val: number) {
  assert(val === 0 || val > 0, 'should be positive or zero')
}
