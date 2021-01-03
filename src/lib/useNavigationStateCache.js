import { useEffect, useMemo } from 'react'

import GenerationalCache from '../lib/GenerationalCache'
import PrefixCache from '../lib/PrefixCache'
import makeLocationId from '../lib/makeLocationId'
import usePrevious from '../lib/usePrevious'

export default function useNavigationStateCache(
  maxHistoryLength,
  persister,
  useHistory,
  useLocation,
  historyListenLocationAccessor
) {
  const history = useHistory()
  const location = useLocation()
  const prevLocationRef = usePrevious(location)
  const locationId = useMemo(() => makeLocationId(location), [location])
  const cache = useMemo(
    () => new GenerationalCache(maxHistoryLength, persister),
    [maxHistoryLength, persister]
  )

  useEffect(() => {
    return history.listen(change => {
      const location = historyListenLocationAccessor(change)

      if (
        makeLocationId(location) !== makeLocationId(prevLocationRef.current)
      ) {
        cache.nextGeneration()
      }
    })
  }, [cache, history, prevLocationRef, historyListenLocationAccessor])

  return useMemo(() => new PrefixCache(locationId, cache), [locationId, cache])
}
