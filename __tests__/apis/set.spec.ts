import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('set', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    expect(await client.get('namespace', 'key')).toBe('value')
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.set('namespace', 'key', 'old-value', Infinity, Infinity)

    await client.set('namespace', 'key', 'new-value', Infinity, Infinity)

    expect(await client.get('namespace', 'key')).toBe('new-value')
  })
})
