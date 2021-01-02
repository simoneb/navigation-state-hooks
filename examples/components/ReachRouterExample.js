// eslint-disable-next-line no-unused-vars
const ReachRouterExample = (function () {
  const { Router, Link } = ReachRouter

  const useNavigationState = useReachRouterNavigationState
  const { NavigationStateProvider } = useNavigationState

  function ReachRouterExample() {
    return (
      <Router>
        <Root default></Root>
      </Router>
    )
  }

  function Root() {
    return (
      <NavigationStateProvider>
        <App />
      </NavigationStateProvider>
    )
  }

  ReachRouterExample.propTypes = {}

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
    return 'Help'
  }

  return ReachRouterExample
})()
