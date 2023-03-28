import { startService, stopService, buildClient } from '@test/utils.js'
import { jest } from '@jest/globals'

beforeEach(startService)
afterEach(stopService)

describe('setItem', () => {
  test('item does not exist', async () => {
    jest.useFakeTimers({ now: 100 })
    try {
      const client = await buildClient()

      await client.setItem('namespace', 'key', 'value', null)

      expect(await client.getItem('namespace', 'key')).toStrictEqual({
        value: 'value'
      , metadata: {
          timeToLive: null
        , updatedAt: 100
        }
      })
    } finally {
      jest.useRealTimers()
    }
  })

  test('item exists', async () => {
    jest.useFakeTimers({ now: 100 })
    try {
      const client = await buildClient()
      await client.setItem('namespace', 'key', 'old-value', null)

      jest.setSystemTime(200)
      await client.setItem('namespace', 'key', 'new-value', null)

      expect(await client.getItem('namespace', 'key')).toStrictEqual({
        value: 'new-value'
      , metadata: {
          timeToLive: null
        , updatedAt: 200
        }
      })
    } finally {
      jest.useRealTimers()
    }
  })
})
