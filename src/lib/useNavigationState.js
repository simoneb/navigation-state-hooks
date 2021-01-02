import { useContext, useEffect, useState } from 'react'

import { NavigationStateContext } from './NavigationStateProvider'

export default function useNavigationState(initializer) {
  const context = useContext(NavigationStateContext)

  if (!context) {
    throw new Error(
      'NavigationStateContext not found in component hierarchy. Make Sure to wrap your component tree with <NavigationStateProvider>'
    )
  }

  const result = useState(context.cache.get() || initializer)

  const [state] = result

  useEffect(() => {
    context.cache.set(state)
  }, [context.cache, state])

  useEffect(() => {
    console.log(JSON.stringify(context.cache._cache()))
  })

  return result
}
