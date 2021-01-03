// eslint-disable-next-line no-unused-vars
const ReachRouterExample = (function () {
  const { Router, Link } = ReachRouter

  const useNavigationState = useReachRouterNavigationState
  const { NavigationStateProvider, sessionPersister } = useNavigationState

  function ReachRouterExample(props) {
    return (
      <Router>
        <Root default {...props}></Root>
      </Router>
    )
  }

  function Root({ persist, ...props }) {
    const persister = persist
      ? sessionPersister('reach-router-session-persister')
      : undefined

    return (
      <NavigationStateProvider persister={persister} {...props}>
        <App />
      </NavigationStateProvider>
    )
  }

  Root.propTypes = {
    persist: PropTypes.bool,
  }

  return ReachRouterExample

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
          <Router>
            <Simple path="/" />
            <Complex path="/complex" />
            <NoState path="/no-state" />
          </Router>
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
