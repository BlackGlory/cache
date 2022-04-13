import { startService, stopService, buildClient } from '@test/utils'

beforeEach(startService)
afterEach(stopService)

describe('get', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.getWithMetadata('namespace', 'key')

    expect(result).toBeNull()
  })

  describe('exists', () => {
    test('timeToLive and timeBeforeDeletion are null', async () => {
      const client = await buildClient()
      await client.set('namespace', 'key', 'value', null, null)

      const result = await client.getWithMetadata('namespace', 'key')

      expect(result).toStrictEqual({
        value: 'value'
      , metadata: {
          updatedAt: expect.any(Number)
        , timeToLive: null
        , timeBeforeDeletion: null
        }
      })
    })

    test('timeToLive and timeBeforeDeletion are not null', async () => {
      const client = await buildClient()
      await client.set('namespace', 'key', 'value', 10000, 20000)

      const result = await client.getWithMetadata('namespace', 'key')

      expect(result).toStrictEqual({
        value: 'value'
      , metadata: {
          updatedAt: expect.any(Number)
        , timeToLive: 10000
        , timeBeforeDeletion: 20000
        }
      })
    })
  })
})
