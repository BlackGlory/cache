import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('getItemWithMetadata', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    const result = await client.getItemWithMetadata('namespace', 'key')

    expect(result).toBeNull()
  })

  describe('exists', () => {
    test('timeToLive is null', async () => {
      const client = await buildClient()
      await client.setItem('namespace', 'key', 'value', null)

      const result = await client.getItemWithMetadata('namespace', 'key')

      expect(result).toStrictEqual({
        value: 'value'
      , metadata: {
          // eslint-disable-next-line
          updatedAt: expect.any(Number)
        , timeToLive: null
        }
      })
    })

    test('timeToLive is not null', async () => {
      const client = await buildClient()
      await client.setItem('namespace', 'key', 'value', 10000)

      const result = await client.getItemWithMetadata('namespace', 'key')

      expect(result).toStrictEqual({
        value: 'value'
      , metadata: {
          // eslint-disable-next-line
          updatedAt: expect.any(Number)
        , timeToLive: 10000
        }
      })
    })
  })
})
