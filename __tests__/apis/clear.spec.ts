import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('clear', () => {
  test('no items', async () => {
    const client = await buildClient()

    await client.clear('namespace')

    expect(await client.has('namespace', 'key')).toBe(false)
  })

  test('has items', async () => {
    const client = await buildClient()
    await client.set('namespace', 'key', 'value', null)

    await client.clear('namespace')

    expect(await client.has('namespace', 'key')).toBe(false)
  })
})
