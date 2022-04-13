import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('getAllItemKeys', () => {
  test('no items', async () => {
    const client = await buildClient()

    const result = await client.getAllItemKeys('namespace')

    expect(result).toStrictEqual([])
  })

  test('has items', async () => {
    const client = await buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    const result = await client.getAllItemKeys('namespace')

    expect(result).toStrictEqual(['key'])
  })
})
