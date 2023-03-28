import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getItemValue', () => {
  test('item does not exist', async () => {
    const client = await buildClient()

    const result = await client.getItemValue('namespace', 'key')

    expect(result).toBeNull()
  })

  test('item exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.getItemValue('namespace', 'key')

    expect(result).toBe('value')
  })
})
