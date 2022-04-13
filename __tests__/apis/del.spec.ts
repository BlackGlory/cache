import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('del', () => {
  test('does not exist', async () => {
    const client = buildClient()

    await client.del('namespace', 'key')

    expect(await client.has('namespace', 'key')).toBe(false)
  })

  test('exists', async () => {
    const client = buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    await client.del('namespace', 'key')

    expect(await client.has('namespace', 'key')).toBe(false)
  })
})
