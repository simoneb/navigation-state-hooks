const INITIAL = () => [{}]

export default function GenerationalCache(maxGenerations, persister) {
  let cache = persister.hydrate() || INITIAL()

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
      persister.persist(cache)
    },
    nextGeneration() {
      // use generations
      if (maxGenerations && maxGenerations > -1) {
        cache.splice(maxGenerations, cache.unshift({}) - maxGenerations)
      }
      // if not using generations, make sure the length is 1 (may be larger if previously persisted)
      else if (cache.length > 1) {
        cache.length = 1
      }

      persister.persist(cache)
    },
    clear() {
      cache = INITIAL()
      persister.persist(cache)
    },
    _cache() {
      return cache
    },
  }
}
