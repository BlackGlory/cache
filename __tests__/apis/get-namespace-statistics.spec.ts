import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getNamespaceStatistics', () => {
  test('namespace does not exist', async () => {
    const client = await buildClient()

    const result = await client.getNamespaceStatistics('namespace')

    expect(result).toStrictEqual({
      items: 0
    })
  })

  test('namespace exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.getNamespaceStatistics('namespace')

    expect(result).toStrictEqual({
      items: 1
    })
  })
})
