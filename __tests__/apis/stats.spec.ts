import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('stats', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.stats('namespace')

    expect(result).toStrictEqual({
      namespace: 'namespace'
    , items: 0
    })
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'value', null)

    const result = await client.stats('namespace')

    expect(result).toStrictEqual({
      namespace: 'namespace'
    , items: 1
    })
  })
})
