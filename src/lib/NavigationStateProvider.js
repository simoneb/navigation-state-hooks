import React, { useMemo } from 'react'
import T from 'prop-types'

import useNavigationStateCache from './useNavigationStateCache'
import { NULL_PERSISTER } from './persisters'

export const NavigationStateContext = React.createContext()
NavigationStateContext.displayName = 'NavigationStateContext'

const identity = _ => _

export default function NavigationStateProvider({
  children,
  maxHistoryLength,
  debug,
  persister,
  useHistory,
  useLocation,
  historyListenLocationAccessor,
}) {
  const cache = useNavigationStateCache(
    maxHistoryLength,
    persister,
    useHistory,
    useLocation,
    historyListenLocationAccessor
  )

  const context = useMemo(() => ({ cache, debug }), [cache, debug])

  return (
    <NavigationStateContext.Provider value={context}>
      {children}
    </NavigationStateContext.Provider>
  )
}

NavigationStateProvider.propTypes = {
  children: T.node.isRequired,
  maxHistoryLength: T.number,
  persister: T.object,
  debug: T.bool,
  useHistory: T.func.isRequired,
  useLocation: T.func.isRequired,
  historyListenLocationAccessor: T.func,
}

NavigationStateProvider.defaultProps = {
  maxHistoryLength: null,
  persister: NULL_PERSISTER,
  debug: false,
  historyListenLocationAccessor: identity,
}

NavigationStateProvider.displayName = 'NavigationStateProvider'
