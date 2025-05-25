import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('removeItem', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    await client.removeItem('namespace', 'key')

    expect(await client.hasItem('namespace', 'key')).toBe(false)
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    await client.removeItem('namespace', 'key')

    expect(await client.hasItem('namespace', 'key')).toBe(false)
  })
})
