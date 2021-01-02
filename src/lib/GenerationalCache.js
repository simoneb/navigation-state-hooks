export default function GenerationalCache(maxGenerations) {
  const cache = [{}]

  return {
    get(key) {
      for (const generation of cache) {
        if (key in generation) {
          return generation[key]
        }
      }
    },
    set(key, value) {
      cache[0][key] = value
    },
    nextGeneration() {
      cache.splice(maxGenerations, cache.unshift({}) - maxGenerations)
    },
    _cache() {
      return cache
    },
  }
}
