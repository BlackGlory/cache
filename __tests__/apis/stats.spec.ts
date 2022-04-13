import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('stats', () => {
  test('does not exist', async () => {
    const client = buildClient()

    const result = await client.stats('namespace')

    expect(result).toStrictEqual({
      namespace: 'namespace'
    , items: 0
    })
  })

  test('exists', async () => {
    const client = buildClient()
    await client.set('namespace', 'key', 'value', Infinity, Infinity)

    const result = await client.stats('namespace')

    expect(result).toStrictEqual({
      namespace: 'namespace'
    , items: 1
    })
  })
})
