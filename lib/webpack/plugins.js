var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function styles (globalConfig, webpackConfig) {
  var env = globalConfig.env;
  var isDevelopment = globalConfig.isDevelopment;
  var isProduction = globalConfig.isProduction;
  var isTest = globalConfig.isTest;
  var srcPath = globalConfig.srcPath;

  var globals = {
    'process.env': {
      'NODE_ENV': JSON.stringify({
        isDevelopment: isDevelopment,
        isProduction: isProduction,
        isTest: isTest
      })
    },
    'NODE_ENV': env
  }

  webpackConfig.plugins.push(
    new webpack.DefinePlugin(globals),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      favicon: path.resolve(srcPath, 'static/favicon.ico'),
      minify: {
        collapseWhitespace: true
      }
    })
  )

  if (isDevelopment) {
    webpackConfig.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    )
  } else if (isProduction) {
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

  if (!isTest) {
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      names: ['vendors']
    }))
  }

  return webpackConfig;
}
