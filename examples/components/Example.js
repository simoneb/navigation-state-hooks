const choices = [ReactRouterExample, ReachRouterExample].reduce(
  (acc, c) => ({ ...acc, [c.name]: c }),
  {}
)

function Example() {
  const [choice, setChoice] = React.useState(Object.keys(choices)[0])

  const Component = choices[choice]

  return (
    <div>
      <select value={choice} onChange={e => setChoice(e.target.value)}>
        {Object.keys(choices).map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 0.5 }}>
          <Component />
        </div>
        <div style={{ flex: 1, marginLeft: '3rem' }}>
          <Source fileName={choice} />
        </div>
      </div>
    </div>
  )
}

Example.propTypes = {}
