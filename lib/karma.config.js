var path = require('path');

var resolveCwd = require('./helpers/resolveCwd');
var paths = require('./helpers/paths');
var webpackConfig = require('./webpack.config');

var WATCH = false;
var COVERAGE_ENABLED = false;

var phantomjsPolyfillPath = path.resolve(paths.baseNodeModules, 'phantomjs-polyfill/bind-polyfill.js');
var sinonPath = path.resolve(paths.baseNodeModules, 'sinon/pkg/sinon.js');
var testBundlerPath = path.resolve(__dirname, '../browser/test-bundler.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var coverageReporters = [{
  type: 'text-summary'
}, {
  type: 'lcov',
  dir: 'coverage'
}]

var karmaConfig = {
  basePath: resolveCwd('./'),
  files: [phantomjsPolyfillPath, {
    pattern: testBundlerPath,
    watched: false,
    served: true,
    included: true
  }],
  singleRun: false,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: _defineProperty({}, testBundlerPath, ['webpack']),
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'cheap-module-source-map',
    resolveLoader: webpackConfig.resolveLoader,
    resolve: Object.assign({}, webpackConfig.resolve, {
      alias: Object.assign({}, webpackConfig.resolve.alias, {
        sinon: sinonPath
      })
    }),
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    externals: Object.assign({}, webpackConfig.externals, {
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'text-encoding': 'window'
    }),
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: coverageReporters
  }
};

if (COVERAGE_ENABLED) {
  karmaConfig.reporters.push('coverage');
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(paths.srcDir),
    loader: 'isparta',
    exclude: /node_modules/
  }];
}

module.exports = function (config) {
  return config.set(karmaConfig);
};
