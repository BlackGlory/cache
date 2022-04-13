import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('get', () => {
  test('does not exist', async () => {
    const client = buildClient()

    const result = await client.get('namespace', 'key')

    expect(result).toBeNull()
  })

  test('exists', async () => {
    const client = buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    const result = await client.get('namespace', 'key')

    expect(result).toBe('value')
  })
})
