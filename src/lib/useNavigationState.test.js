import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import { NavigationStateContext } from './NavigationStateProvider'
import useNavigationState from './useNavigationState'

describe('useNavigationState', () => {
  it('should throw when rendering without provider', () => {
    const { result } = renderHook(() => useNavigationState(1))

    expect(() => result.current).toThrow(
      /NavigationStateContext not found in component hierarchy. Make Sure to wrap your component tree with <NavigationStateProvider>/
    )
  })

  describe('with valid context', () => {
    let context

    beforeEach(() => {
      context = {
        cache: {
          get: jest.fn(),
          set: jest.fn(),
          _cache: jest.fn(),
        },
      }
    })

    const setup = (initializer, options) => {
      const wrapper = ({ children }) => (
        <NavigationStateContext.Provider value={context}>
          {children}
        </NavigationStateContext.Provider>
      )

      return renderHook(
        ({ initializer, options }) => useNavigationState(initializer, options),
        {
          initialProps: { initializer, options },
          wrapper,
        }
      )
    }

    it('should return initial value', () => {
      const { result } = setup(1)

      expect(result.current[0]).toBe(1)
    })

    it('should set initial value into cache', () => {
      setup(1)

      expect(context.cache.set).toHaveBeenCalledWith(null, 1)
    })

    it('should set initial value into cache with prefix', () => {
      setup(1, { prefix: 'some-prefix' })

      expect(context.cache.set).toHaveBeenCalledWith('some-prefix', 1)
    })

    it('should try to get initial value from cache', () => {
      setup(1)

      expect(context.cache.get).toHaveBeenCalledWith(null)
    })

    it('should populate initial value from cache if there is one', () => {
      context.cache.get.mockReturnValue(2)

      const { result } = setup(1)

      expect(result.current[0]).toBe(2)
    })

    it('should populate initial falsy value from cache if there is one', () => {
      context.cache.get.mockReturnValue(false)

      const { result } = setup(1)

      expect(result.current[0]).toBe(false)
    })

    it('should not debug by default', () => {
      const spy = jest.spyOn(console, 'debug')

      setup()

      expect(spy).not.toHaveBeenCalled()
    })

    it('should debug if enabled at provider level', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation()

      context.debug = true

      setup()

      expect(spy).toHaveBeenCalled()
    })

    it('should debug if enabled at hook level', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation()

      setup(1, { debug: true })

      expect(spy).toHaveBeenCalled()
    })
  })
})
