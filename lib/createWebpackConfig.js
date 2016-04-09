var path = require('path');
var getResolveLoader = require('./helpers/getResolveLoader');
var resolveCwd = require('./helpers/resolveCwd');
var getResolve = require('./helpers/getResolve');
var getVendors = require('./helpers/getVendors');

var plugins = require('./webpack/plugins');
var scripts = require('./webpack/scripts');
var styles = require('./webpack/styles');

var basePath = path.resolve(__dirname, '../');

function createWebpackConfig (globalConfig) {
  var isDevelopment = globalConfig.isDevelopment;
  var mainModulePath = globalConfig.mainModulePath;
  var isProduction = globalConfig.isProduction;
  var mainModulePath = resolveCwd('src', 'index.js');
  var hotDevServerPath = path.resolve(basePath, 'node_modules/webpack/hot/dev-server');
  var hotMiddlewarePath = path.resolve(basePath, 'node_modules/webpack-hot-middleware/client');

  var app = isDevelopment
    ? [mainModulePath, hotDevServerPath, hotMiddlewarePath]
    : [mainModulePath]

  var hashType = (isProduction) ? 'chunkhash' : 'hash'

  var webpackConfig = {
    devtool: 'source-map',
    resolveLoader: getResolveLoader(),
    resolve: getResolve(),
    entry: {
      app: app,
      vendors: getVendors()
    },
    output: {
      path: resolveCwd('dist'),
      filename: '[name]-[' + hashType + '].js'
    },
    module: {
      loaders: [],
      preLoaders: []
    },
    plugins: []
  };

  webpackConfig = plugins(globalConfig, webpackConfig);
  webpackConfig = scripts(globalConfig, webpackConfig);
  webpackConfig = styles(globalConfig, webpackConfig);

  return webpackConfig;
}

module.exports = createWebpackConfig;
