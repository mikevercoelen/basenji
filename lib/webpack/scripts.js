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

module.exports = function scripts (globalConfig, webpackConfig) {
  var isDevelopment = globalConfig.isDevelopment;
  var isProduction = globalConfig.isProduction;
  var isTest = globalConfig.isTest;

  var preprocess = {
    isDevelopment: isDevelopment,
    isProduction: isProduction,
    isTest: isTest
  }

  // eslint loader
  webpackConfig.module.preLoaders.push({
    test: /\.js$/,
    loader: 'eslint',
    include: /src/
  })

  webpackConfig.eslint = {
    configFile: '.eslintrc',
    emitWarning: isDevelopment
  }

  // babel + preprocess
  webpackConfig.module.loaders.push({
    test: /\.js$/,
    loader: 'babel?' + JSON.stringify(babelConfig) +
            '!preprocess?' + JSON.stringify(preprocess),
    include: /src/
  })

  // json
  webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json',
    include: /src/
  })

  return webpackConfig;
}
