// eslint-disable-next-line no-unused-vars
const ReachRouterExample = (function () {
  const { Router, Link } = ReachRouter

  const useNavigationState = useReachRouterNavigationState
  const { NavigationStateProvider } = useNavigationState

  return function ReachRouterExample() {
    return (
      <Router>
        <Root default></Root>
      </Router>
    )
  }

  function Root() {
    return (
      <NavigationStateProvider debug>
        <App />
      </NavigationStateProvider>
    )
  }

  function App() {
    return (
      <div>
        <header>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </header>
        <div>
          <Router>
            <Home path="/" />
            <About path="/about" />
            <Help path="/help" />
          </Router>
        </div>
      </div>
    )
  }

  function Home() {
    const [state, setState] = useNavigationState(1)

    return (
      <div>
        <h2>Home</h2>
        <p>{state}</p>
        <button onClick={() => setState(s => s + 1)}>increase</button>
      </div>
    )
  }

  function About() {
    const [state, setState] = useNavigationState(10)

    return (
      <div>
        <h2>About</h2>
        <p>{state}</p>
        <button onClick={() => setState(s => s + 1)}>increase</button>
      </div>
    )
  }

  function Help() {
    const [state1, setState1] = useNavigationState(100, { prefix: 'prefix1' })
    const [state2, setState2] = useNavigationState(200, { prefix: 'prefix2' })

    return (
      <div>
        <h2>Help</h2>
        <p>State1: {state1}</p>
        <p>State2: {state2}</p>
        <button onClick={() => setState1(s => s + 1)}>increase 1</button>
        <button onClick={() => setState2(s => s + 1)}>increase 2</button>
      </div>
    )
  }
})()
