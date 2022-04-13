import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('getAllNamespaces', () => {
  test('no items', async () => {
    const client = buildClient()

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual([])
  })

  test('has items', async () => {
    const client = buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    const result = await client.getAllNamespaces()

    expect(result).toStrictEqual(['namespace'])
  })
})
