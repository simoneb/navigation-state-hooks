import makeLocationId from './makeLocationId'

describe('makeLocationId', () => {
  it('should create location id from location', () => {
    const location = {
      pathname: '/path',
      search: 'query=string',
      hash: 'hash',
    }

    expect(makeLocationId(location)).toBe('/path?query=string#hash')
  })
})
