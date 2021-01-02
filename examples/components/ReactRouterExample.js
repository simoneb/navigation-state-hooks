// eslint-disable-next-line no-unused-vars
const ReactRouterExample = (function () {
  const { BrowserRouter, Link, Route, Switch } = ReactRouterDOM

  const useNavigationState = useReactRouterNavigationState
  const { NavigationStateProvider } = useNavigationState

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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/help" component={Help} />
          </Switch>
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

  function ReactRouterExample() {
    return (
      <BrowserRouter>
        <NavigationStateProvider>
          <App />
        </NavigationStateProvider>
      </BrowserRouter>
    )
  }

  return ReactRouterExample
})()
