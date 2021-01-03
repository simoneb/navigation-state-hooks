import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const defaultPlugins = [peerDepsExternal(), babel({ babelHelpers: 'bundled' })]

function reactRouterUmd(outputPath) {
  return {
    input: 'src/react-router.js',
    output: {
      file: `${outputPath}/react-router-umd.js`,
      format: 'umd',
      name: 'useReactRouterNavigationState',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        'react-router-dom': 'ReactRouterDOM',
      },
      sourcemap: true,
    },
    plugins: defaultPlugins,
  }
}

function reachRouterUmd(outputPath) {
  return {
    input: 'src/reach-router.js',
    output: {
      file: `${outputPath}/reach-router-umd.js`,
      format: 'umd',
      name: 'useReachRouterNavigationState',
      globals: {
        react: 'React',
        'prop-types': 'PropTypes',
        '@reach/router': 'ReachRouter',
      },
      sourcemap: true,
    },
    plugins: defaultPlugins,
  }
}

export default [
  {
    input: ['src/react-router.js', 'src/reach-router.js'],
    output: [
      {
        dir: 'cjs',
        format: 'cjs',
        exports: 'default',
        sourcemap: true,
      },
      {
        dir: 'es',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: defaultPlugins,
  },
  // UMD
  { ...reactRouterUmd('umd') },
  { ...reachRouterUmd('umd') },
  { ...reactRouterUmd('examples/assets') },
  { ...reachRouterUmd('examples/assets') },
]
