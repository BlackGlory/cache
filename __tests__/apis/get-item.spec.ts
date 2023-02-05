import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getItem', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.getItem('namespace', 'key')

    expect(result).toBeNull()
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.getItem('namespace', 'key')

    expect(result).toBe('value')
  })
})
