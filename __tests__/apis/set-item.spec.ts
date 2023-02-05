import { startService, stopService, buildClient } from '@test/utils.js'

beforeEach(startService)
afterEach(stopService)

describe('setItem', () => {
  test('does not exist', async () => {
    const client = await buildClient()

    await client.setItem('namespace', 'key', 'value', null)

    expect(await client.getItem('namespace', 'key')).toBe('value')
  })

  test('exists', async () => {
    const client = await buildClient()
    await client.setItem('namespace', 'key', 'old-value', null)

    await client.setItem('namespace', 'key', 'new-value', null)

    expect(await client.getItem('namespace', 'key')).toBe('new-value')
  })
})
