export const NULL_PERSISTER = {
  hydrate() {},
  persist() {},
}

function StoragePersister(key, storage) {
  return {
    hydrate() {
      try {
        return JSON.parse(storage.getItem(key))
      } catch (err) {
        return
      }
    },
    persist(value) {
      storage.setItem(key, JSON.stringify(value))
    },
  }
}

export const localPersister = key =>
  new StoragePersister(key, window.localStorage)
export const sessionPersister = key =>
  new StoragePersister(key, window.sessionStorage)
