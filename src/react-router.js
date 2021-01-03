import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import NavigationStateProvider from './lib/NavigationStateProvider'
import useNavigationState from './lib/useNavigationState'
import * as persisters from './lib/persisters'

function ReactRouterNavigationStateProvider(props) {
  return (
    <NavigationStateProvider
      {...props}
      useHistory={useHistory}
      useLocation={useLocation}
    />
  )
}

export default Object.assign(useNavigationState, {
  NavigationStateProvider: ReactRouterNavigationStateProvider,
  ...persisters,
})
