import { describe, test, expect, beforeEach, afterEach } from 'vitest'
import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getAllNamespaces', () => {
  test('no items', async () => {
    const client = await buildClient()

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual([])
  })

  test('has items', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })
})
