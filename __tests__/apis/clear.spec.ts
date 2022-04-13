import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('clear', () => {
  test('no items', async () => {
    const client = buildClient()

    await client.clear('namespace')

    expect(await client.has('namespace', 'key')).toBe(false)
  })

  test('has items', async () => {
    const client = buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    await client.clear('namespace')

    expect(await client.has('namespace', 'key')).toBe(false)
  })
})
