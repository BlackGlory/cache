import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('hasItem', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.hasItem('namespace', 'key')

    expect(result).toBe(false)
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.hasItem('namespace', 'key')

    expect(result).toBe(true)
  })
})
