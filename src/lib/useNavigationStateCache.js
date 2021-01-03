import { useEffect, useMemo, useRef } from 'react'

import GenerationalCache from '../lib/GenerationalCache'
import PrefixCache from '../lib/PrefixCache'
import makeLocationId from '../lib/makeLocationId'

export default function useNavigationStateCache(
  maxHistoryLength,
  persister,
  useHistory,
  useLocation,
  historyListenLocationAccessor
) {
  const history = useHistory()
  const location = useLocation()
  const oldLocation = useRef()
  const locationId = useMemo(() => makeLocationId(location), [location])
  const cache = useMemo(
    () => new GenerationalCache(maxHistoryLength, persister),
    [maxHistoryLength, persister]
  )

  useEffect(() => {
    return history.listen(change => {
      const location = historyListenLocationAccessor(change)

      if (
        !oldLocation.current ||
        makeLocationId(location) !== makeLocationId(oldLocation.current)
      ) {
        cache.nextGeneration()
      }

      oldLocation.current = location
    })
  }, [cache, history, oldLocation, historyListenLocationAccessor])

  return useMemo(() => new PrefixCache(locationId, cache), [locationId, cache])
}
