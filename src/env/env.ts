import { ValueGetter } from 'value-getter'
import { isNumber } from '@blackglory/prelude'
import { Getter } from 'justypes'
import { getCache } from './cache.js'
import appRoot from 'app-root-path'
import * as path from 'path'

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

export const CI: Getter<boolean> =
  env('CI')
    .convert(toBool)
    .default(false)
    .memoize(getCache)
    .get()

export const DATA: Getter<string> =
  env('CACHE_DATA')
    .default(path.join(appRoot.path, 'data'))
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
