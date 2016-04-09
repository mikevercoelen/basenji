var path = require('path');
var fs = require('fs-extra');
var webpack = require('webpack');
var paths = require('./helpers/paths');

var createWebpackConfig = require('./createWebpackConfig');

var webpackConfig = createWebpackConfig({
  isDevelopment: false,
  isTest: false,
  isProduction: true,
  env: 'production'
})

var bundler = webpack(webpackConfig);

bundler.run(function (error) {
  if (error) {
    return console.log(error);
  }

  console.log('Compiled. Now copying assets to /build folder.');
  fs.copySync(paths.assetsPath, paths.buildPath);
  console.log('Finished, check /build folder.');
})
