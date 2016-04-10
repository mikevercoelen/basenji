var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var paths = require('../helpers/paths');
var env = require('../helpers/env');
var HappyPack = require('happypack');
var babelConfig = require('../helpers/babelConfig');
var globals = require('../helpers/globals');

module.exports = function styles (webpackConfig) {
  webpackConfig.plugins.push(
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.srcPath, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      favicon: path.resolve(paths.srcPath, 'static/favicon.ico'),
      minify: {
        collapseWhitespace: true
      }
    })
  )

  var preprocess =

  webpackConfig.plugins.push(
    new HappyPack({
      id: 'scripts',
      loaders: [
        'babel?' + JSON.stringify(babelConfig)
      ]
    })
  )

  if (env.isDevelopment) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )
  } else if (env.isProduction) {
    webpackConfig.plugins.push(
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    )
  }

  if (!env.isTest) {
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors']
    }))
  }

  return webpackConfig;
}
