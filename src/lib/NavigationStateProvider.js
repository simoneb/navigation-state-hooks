import React, { useMemo } from 'react'
import T from 'prop-types'

import useNavigationStateCache from './useNavigationStateCache'

export const NavigationStateContext = React.createContext()
NavigationStateContext.displayName = 'NavigationStateContext'

const identity = _ => _

export default function NavigationStateProvider({
  children,
  useHistory,
  useLocation,
  maxHistoryLength,
  historyListenLocationAccessor,
  debug,
}) {
  const cache = useNavigationStateCache(
    maxHistoryLength,
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
  useHistory: T.func.isRequired,
  useLocation: T.func.isRequired,
  historyListenLocationAccessor: T.func,
  maxHistoryLength: T.number,
  debug: T.bool,
}

NavigationStateProvider.defaultProps = {
  historyListenLocationAccessor: identity,
  maxHistoryLength: 2,
  debug: false,
}
