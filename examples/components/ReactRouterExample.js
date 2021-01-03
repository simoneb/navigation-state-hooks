// eslint-disable-next-line no-unused-vars
const ReactRouterExample = (function () {
  const { BrowserRouter, Link, Route, Switch } = ReactRouterDOM

  const useNavigationState = useReactRouterNavigationState
  const { NavigationStateProvider, sessionPersister } = useNavigationState

  function ReactRouterExample({ persist, ...props }) {
    const persister = persist
      ? sessionPersister('react-router-session-persister')
      : undefined

    return (
      <BrowserRouter>
        <NavigationStateProvider persister={persister} {...props}>
          <App />
        </NavigationStateProvider>
      </BrowserRouter>
    )
  }

  ReactRouterExample.propTypes = {
    persist: PropTypes.bool,
  }

  return ReactRouterExample

  function App() {
    return (
      <div>
        <header>
          <ul>
            <li>
              <Link to="/">Simple</Link>
            </li>
            <li>
              <Link to="/complex">Complex</Link>
            </li>
            <li>
              <Link to="/no-state">No state</Link>
            </li>
          </ul>
        </header>
        <div>
          <Switch>
            <Route path="/" exact component={Simple} />
            <Route path="/complex" component={Complex} />
            <Route path="/no-state" component={NoState} />
          </Switch>
        </div>
      </div>
    )
  }

  function Simple() {
    const [state, setState] = useNavigationState(1)

    return (
      <div>
        <h2>Simple</h2>
        <p>{state}</p>
        <button onClick={() => setState(s => s + 1)}>increase</button>
      </div>
    )
  }

  function Complex() {
    const [state1, setState1] = useNavigationState(100, { prefix: 'prefix1' })
    const [state2, setState2] = useNavigationState(200, { prefix: 'prefix2' })

    return (
      <div>
        <h2>Complex</h2>
        <p>State1: {state1}</p>
        <p>State2: {state2}</p>
        <button onClick={() => setState1(s => s + 1)}>increase 1</button>
        <button onClick={() => setState2(s => s + 1)}>increase 2</button>
      </div>
    )
  }

  function NoState() {
    return (
      <div>
        <h2>No State</h2>
      </div>
    )
  }
})()
