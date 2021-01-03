export default function PrefixCache(prefix, cache) {
  function makeKey(key) {
    return [prefix, key].filter(Boolean).join('-')
  }

  return {
    get(key) {
      return cache.get(makeKey(key))
    },
    set(key, value) {
      return cache.set(makeKey(key), value)
    },
    nextGeneration() {
      return cache.nextGeneration()
    },
    clear() {
      return cache.clear()
    },
    _cache() {
      return cache._cache()
    },
  }
}
