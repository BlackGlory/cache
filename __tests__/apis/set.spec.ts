import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('set', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    await client.set('namespace', 'key', 'value', null)

    expect(await client.get('namespace', 'key')).toBe('value')
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.set('namespace', 'key', 'old-value', null)

    await client.set('namespace', 'key', 'new-value', null)

    expect(await client.get('namespace', 'key')).toBe('new-value')
  })
})
