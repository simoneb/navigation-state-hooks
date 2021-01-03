import useLocationStateReactRouter, {
  NavigationStateProvider as ReactRouterNavigationStateProvider,
} from '../react-router'

import useLocationStateReachRouter, {
  NavigationStateProvider as ReachRouterNavigationStateProvider,
} from '../reach-router'

describe('enrtypoints', () => {
  describe('react-router', () => {
    it('should import default hook', () => {
      expect(useLocationStateReactRouter).toBeDefined()
    })

    it('should import provider', () => {
      expect(ReactRouterNavigationStateProvider).toBeDefined()
    })
  })

  describe('reach-router', () => {
    it('should import default hook', () => {
      expect(useLocationStateReachRouter).toBeDefined()
    })

    it('should import provider', () => {
      expect(ReachRouterNavigationStateProvider).toBeDefined()
    })
  })

  it('should fail when importing root', async () => {
    expect(() => import('..')).rejects.toThrow(/cannot find module/i)
  })
})
