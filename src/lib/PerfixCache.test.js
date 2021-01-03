import PrefixCache from './PrefixCache'

const makeKey = (prefix, key) => (prefix ? `${prefix}-${key}` : key)

describe('PrefixCache', () => {
  describe.each([[null], ['some-prefix']])('with prefix %s', prefix => {
    const stub = {
      get: jest.fn(),
      set: jest.fn(),
      nextGeneration: jest.fn(),
      clear: jest.fn(),
      _cache: jest.fn(),
    }

    const cache = new PrefixCache(prefix, stub)

    it('should proxy get method', () => {
      stub.get.mockReturnValue('value')

      const result = cache.get('key')

      expect(stub.get).toHaveBeenCalledWith(makeKey(prefix, 'key'))
      expect(result).toBe('value')
    })

    it('should proxy set method', () => {
      cache.set('key', 'value')

      expect(stub.set).toHaveBeenCalledWith(makeKey(prefix, 'key'), 'value')
    })

    it.each([['nextGeneration'], ['clear'], ['_cache']])(
      'should proxy %s method',
      method => {
        stub[method].mockReturnValue('whatever')

        const result = cache[method]()

        expect(stub[method]).toHaveBeenCalled()

        expect(result).toBe('whatever')
      }
    )
  })
})
