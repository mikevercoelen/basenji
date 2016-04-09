var path = require('path');
var fs = require('fs-extra');
var webpack = require('webpack');
var resolveCwd = require('./helpers/resolveCwd');

var createWebpackConfig = require('./createWebpackConfig');

var env = 'production';
var srcDir = 'src';
var distDir = 'dist';

var assetsPath = resolveCwd('src/static');

var webpackConfig = createWebpackConfig({
  isDevelopment: false,
  isTest: false,
  isProduction: true,
  env: env,
  srcPath: resolveCwd('src'),
  distPath: resolveCwd('dist'),
  srcDir: srcDir,
  distDir: distDir
})

var bundler = webpack(webpackConfig);

bundler.run(function (error) {
  if (error) {
    return console.log(error);
  }

  console.log('Compiled. Now copying assets to /dist folder.')
  fs.copySync(assetsPath, resolveCwd('dist'))
  console.log('Finished, check /dist folder.')
})
