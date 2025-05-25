import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('clearItem', () => {
  test('no items', async () => {
    const client = await buildClient()

    await client.clearItemsByNamespace('namespace')

    expect(await client.hasItem('namespace', 'key')).toBe(false)
  })

  test('has items', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    await client.clearItemsByNamespace('namespace')

    expect(await client.hasItem('namespace', 'key')).toBe(false)
  })
})
