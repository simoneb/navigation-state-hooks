export default function PrefixCache(prefix, cache) {
  function makeKey(key) {
    return [prefix, key].filter(Boolean).join('-')
  }

  return {
    get(key) {
      return cache.get(makeKey(key))
    },
    set(key, value) {
      cache.set(makeKey(key), value)
    },
    nextGeneration() {
      cache.nextGeneration()
    },
    _cache() {
      return cache._cache()
    },
  }
}
