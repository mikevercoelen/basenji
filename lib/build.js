var path = require('path');
var fs = require('fs-extra');
var webpack = require('webpack');
var rimraf = require('rimraf');

var paths = require('./helpers/paths');
var webpackConfig = require('./webpack.config');

function build (callback) {
  rimraf(paths.buildPath, function () {
    var bundler = webpack(webpackConfig);

    bundler.run(function (error) {
      if (error) {
        return console.log(error);
      }

      console.log('Compiled. Now copying assets to /build folder.');
      fs.copySync(paths.assetsPath, paths.buildPath);
      console.log('Finished, check /build folder.');

      callback();
    });
  });
}

module.exports = build;
