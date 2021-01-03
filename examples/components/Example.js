const choices = [ReactRouterExample, ReachRouterExample].reduce(
  (acc, c) => ({ ...acc, [c.name]: c }),
  {}
)

function usePersistentState(initializer, key) {
  const result = React.useState(
    JSON.parse(sessionStorage.getItem(key) || 'null') || initializer
  )

  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(result[0]))
  }, [key, result])

  return result
}

function Example() {
  const [choice, setChoice] = usePersistentState(
    Object.keys(choices)[0],
    'choice'
  )
  const [maxHistoryLength, setMaxHistoryLength] = usePersistentState(
    2,
    'maxHistoryLength'
  )
  const [persist, setPersist] = usePersistentState(false, 'persist')
  const [debug, setDebug] = usePersistentState(false, 'debug')

  const Component = choices[choice]

  function handleExampleChange(e) {
    window.history.pushState(null, null, '/')
    setChoice(e.target.value)
  }

  return (
    <div>
      <fieldset>
        <div>
          <select value={choice} onChange={handleExampleChange}>
            {Object.keys(choices).map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <span>max history length </span>
            <input
              type="number"
              value={maxHistoryLength}
              onChange={e => setMaxHistoryLength(+e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <span>persist </span>
            <input
              type="checkbox"
              checked={persist}
              onChange={() => setPersist(p => !p)}
            />
            {persist && <span>open the console</span>}
          </label>
        </div>
        <div>
          <label>
            <span>debug </span>
            <input
              type="checkbox"
              checked={debug}
              onChange={() => setDebug(d => !d)}
            />
            {debug && <span>open the console!</span>}
          </label>
        </div>
      </fieldset>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0.5 }}>
          <Component
            maxHistoryLength={maxHistoryLength}
            persist={persist}
            debug={debug}
          />
        </div>
        <div style={{ flex: 1, marginLeft: '3rem' }}>
          <Source fileName={choice} />
        </div>
      </div>
    </div>
  )
}

Example.propTypes = {}
