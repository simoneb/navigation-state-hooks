import React from 'react'
import { globalHistory, useLocation } from '@reach/router'

import NavigationStateProvider from './lib/NavigationStateProvider'
import useNavigationState from './lib/useNavigationState'
import * as persisters from './lib/persisters'

function useHistory() {
  return globalHistory
}

const historyListenLocationAccessor = change => change.location

function ReachRouterNavigationStateProvider(props) {
  return (
    <NavigationStateProvider
      {...props}
      useHistory={useHistory}
      useLocation={useLocation}
      historyListenLocationAccessor={historyListenLocationAccessor}
    />
  )
}

export default Object.assign(useNavigationState, {
  NavigationStateProvider: ReachRouterNavigationStateProvider,
  ...persisters,
})
