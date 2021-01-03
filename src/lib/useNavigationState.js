import { useContext, useEffect, useMemo, useState } from 'react'

import NavigationStateProvider, {
  NavigationStateContext,
} from './NavigationStateProvider'

const DEFAULTS = { prefix: null, debug: false }

export default function useNavigationState(initializer, _options) {
  const options = useMemo(() => ({ ...DEFAULTS, ..._options }), [_options])

  const context = useContext(NavigationStateContext)

  if (!context) {
    throw new Error(
      `${NavigationStateContext.displayName} not found in component hierarchy. Make Sure to wrap your component tree with <${NavigationStateProvider.displayName}>`
    )
  }

  const [state, setState] = useState(
    context.cache.get(options.prefix) || initializer
  )

  useEffect(() => {
    context.cache.set(options.prefix, state)
  }, [context.cache, options.prefix, state])

  useEffect(() => {
    if (context.debug || options.debug) {
      console.debug(JSON.stringify(context.cache._cache()))
    }
  })

  return useMemo(() => [state, setState], [state, setState])
}
