module.exports = {
  cacheDirectory: true,
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy',
    'transform-react-display-name',
    'add-module-exports'
  ],
  presets: ['es2015', 'react', 'stage-0'],
  env: {
    development: {
      plugins: [
        ['react-transform', {
          transforms: [{
            transform: 'react-transform-hmr',
            imports: ['react'],
            locals: ['module']
          }, {
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react']
          }]
        }]
      ]
    },
    production: {
      plugins: [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements'
      ]
    }
  }
}
