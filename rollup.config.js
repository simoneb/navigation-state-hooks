import babel from '@rollup/plugin-babel'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

const plugins = [peerDepsExternal(), babel({ babelHelpers: 'bundled' })]

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
    plugins,
  },
  {
    input: 'src/react-router.js',
    output: [
      {
        file: 'umd/react-router.js',
        format: 'umd',
        name: 'useReactRouterNavigationState',
        globals: {
          react: 'React',
          'prop-types': 'PropTypes',
          'react-router-dom': 'ReactRouterDOM',
        },
        sourcemap: true,
      },
      {
        file: 'examples/react-router-umd.js',
        format: 'umd',
        name: 'useReactRouterNavigationState',
        globals: {
          react: 'React',
          'prop-types': 'PropTypes',
          'react-router-dom': 'ReactRouterDOM',
        },
        sourcemap: true,
      },
    ],
    plugins,
  },
  {
    input: 'src/reach-router.js',
    output: [
      {
        file: 'umd/reach-router.js',
        format: 'umd',
        name: 'useReachRouterNavigationState',
        globals: {
          react: 'React',
          'prop-types': 'PropTypes',
          '@reach/router': 'ReachRouter',
        },
        sourcemap: true,
      },
      {
        file: 'examples/reach-router-umd.js',
        format: 'umd',
        name: 'useReachRouterNavigationState',
        globals: {
          react: 'React',
          'prop-types': 'PropTypes',
          '@reach/router': 'ReachRouter',
        },
        sourcemap: true,
      },
    ],
    plugins,
  },
]
