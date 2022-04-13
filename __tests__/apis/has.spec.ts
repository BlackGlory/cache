import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('has', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.has('namespace', 'key')

    expect(result).toBe(false)
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    const result = await client.has('namespace', 'key')

    expect(result).toBe(true)
  })
})
