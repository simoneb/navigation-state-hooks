import GenerationalCache from './GenerationalCache'
import { NULL_PERSISTER } from './persisters'

describe('GenerationalCache', () => {
  describe('initialization', () => {
    it('hydrates from persister', () => {
      const persister = {
        hydrate: jest.fn().mockReturnValue('whatever'),
      }

      const cache = new GenerationalCache(null, persister)

      expect(persister.hydrate).toHaveBeenCalled()
      expect(cache._cache()).toBe('whatever')
    })
  })

  describe('maxGenerations', () => {
    it.each([[null], [-1], [0]])(
      'stores forever when maxGenerations is %s',
      maxGenerations => {
        const cache = new GenerationalCache(maxGenerations, NULL_PERSISTER)

        cache.set('key', 1)

        expect(cache.get('key')).toBe(1)

        cache.nextGeneration()

        expect(cache.get('key')).toBe(1)
        expect(cache._cache()).toEqual([{ key: 1 }])
      }
    )

    it('stores at most 1 generation when maxGenerations is 1', () => {
      const cache = new GenerationalCache(1, NULL_PERSISTER)

      cache.set('key', 1)

      expect(cache.get('key')).toBe(1)

      cache.nextGeneration()

      expect(cache.get('key')).toBeUndefined()
    })

    it('stores at most 2 generations when maxGenerations is 2', () => {
      const cache = new GenerationalCache(2, NULL_PERSISTER)

      cache.set('key', 1)

      expect(cache.get('key')).toBe(1)

      cache.nextGeneration()

      expect(cache.get('key')).toBe(1)

      cache.nextGeneration()

      expect(cache.get('key')).toBeUndefined()
    })
  })

  describe('clear', () => {
    it('should clear cache', () => {
      const cache = new GenerationalCache(1, NULL_PERSISTER)

      cache.set('key', 1)

      cache.clear()

      expect(cache.get('key')).toBeUndefined()
    })
  })

  describe('persistence', () => {
    const persister = {
      hydrate: jest.fn(),
      persist: jest.fn(),
    }

    it('should persist when setting value', () => {
      const cache = new GenerationalCache(null, persister)

      cache.set('key', 1)

      expect(persister.persist).toHaveBeenCalledWith(cache._cache())
    })

    it('should persist when increasing generations', () => {
      const cache = new GenerationalCache(null, persister)

      cache.nextGeneration()

      expect(persister.persist).toHaveBeenCalledWith(cache._cache())
    })

    it('should persist when clearing', () => {
      const cache = new GenerationalCache(null, persister)

      cache.clear()

      expect(persister.persist).toHaveBeenCalledWith(cache._cache())
    })
  })
})
