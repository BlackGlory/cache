import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('setItem', () => {
  test('item does not exist', async () => {
    vi.useFakeTimers({ now: 0 })
    try {
      const client = await buildClient()

      await client.setItem('namespace', 'key', 'value', null)

      expect(await client.getItem('namespace', 'key')).toStrictEqual({
        value: 'value'
      , metadata: {
          timeToLive: null
        , updatedAt: 0
        }
      })
    } finally {
      vi.useRealTimers()
    }
  })

  test('item exists', async () => {
    vi.useFakeTimers({ now: 0 })
    try {
      const client = await buildClient()
      await client.setItem('namespace', 'key', 'old-value', null)

      vi.advanceTimersByTime(100)
      await client.setItem('namespace', 'key', 'new-value', null)

      expect(await client.getItem('namespace', 'key')).toStrictEqual({
        value: 'new-value'
      , metadata: {
          timeToLive: null
        , updatedAt: 100
        }
      })
    } finally {
      vi.useRealTimers()
    }
  })
})
