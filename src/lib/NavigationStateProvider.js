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
}) {
  const cache = useNavigationStateCache(
    maxHistoryLength,
    useHistory,
    useLocation,
    historyListenLocationAccessor
  )

  const value = useMemo(() => ({ cache }), [cache])

  return (
    <NavigationStateContext.Provider value={value}>
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
}

NavigationStateProvider.defaultProps = {
  historyListenLocationAccessor: identity,
  maxHistoryLength: 2,
}
