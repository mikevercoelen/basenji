var env = require('../helpers/env');

var babelConfig = {
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

module.exports = function scripts (webpackConfig) {
  var preprocess = {
    isDevelopment: env.isDevelopment,
    isProduction: env.isProduction,
    isTest: env.isTest
  }

  // eslint loader
  webpackConfig.module.preLoaders.push({
    test: /\.js$/,
    loader: 'eslint',
    exclude: /node_modules/
  })

  webpackConfig.eslint = {
    configFile: '.eslintrc',
    emitWarning: env.isDevelopment
  }

  // babel + preprocess
  webpackConfig.module.loaders.push({
    test: /\.js$/,
    loader: 'babel?' + JSON.stringify(babelConfig) +
            '!preprocess?' + JSON.stringify(preprocess),
    exclude: /node_modules/
  })

  // json
  webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json'
  })

  return webpackConfig;
}
