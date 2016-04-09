var paths = require('./helpers/paths');
var getResolveLoader = require('./helpers/getResolveLoader');
var getResolve = require('./helpers/getResolve');
var getVendors = require('./helpers/getVendors');

var plugins = require('./webpack/plugins');
var scripts = require('./webpack/scripts');
var styles = require('./webpack/styles');

var env = require('./helpers/env');

var app = env.isDevelopment
  ? [paths.mainModulePath, paths.hotDevServerPath, paths.hotMiddlewarePath]
  : [paths.mainModulePath]

var hashType = (env.isProduction) ? 'chunkhash' : 'hash'

var webpackConfig = {
  devtool: 'source-map',
  resolveLoader: getResolveLoader(),
  resolve: getResolve(),
  entry: {
    app: app,
    vendors: getVendors()
  },
  output: {
    path: paths.buildPath,
    filename: '[name]-[' + hashType + '].js'
  },
  module: {
    loaders: [],
    preLoaders: []
  },
  plugins: []
};

plugins(webpackConfig);
scripts(webpackConfig);
styles(webpackConfig);

module.exports = webpackConfig;
