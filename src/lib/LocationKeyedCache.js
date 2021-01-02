export default function LocationKeyedCache(locationId, cache) {
  return {
    get() {
      return cache.get(locationId)
    },
    set(value) {
      cache.set(locationId, value)
    },
    nextGeneration() {
      cache.nextGeneration()
    },
    _cache() {
      return cache._cache()
    },
  }
}
