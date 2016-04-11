var env = require('../helpers/env');
var paths = require('../helpers/paths');
var resolveCwd = require('../helpers/resolveCwd');
var path = require('path');

module.exports = function scripts (webpackConfig) {
  var browserPath = path.resolve(__dirname, '../../browser');
  var basenjiToolsPath = resolveCwd('node_modules/basenji-tools');

  // babel + preprocess
  webpackConfig.module.loaders.push({
    test: /\.js$/,
    loader: 'happypack/loader?id=scripts',
    include: [
      paths.srcPath,
      paths.testPath,
      browserPath,
      basenjiToolsPath
    ]
  })

  // json
  webpackConfig.module.loaders.push({
    test: /\.json$/,
    loader: 'json'
  })

  return webpackConfig;
}
