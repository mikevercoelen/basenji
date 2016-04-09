var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var paths = require('./helpers/paths');

var createWebpackConfig = require('./createWebpackConfig');

var webpackConfig = createWebpackConfig({
  isDevelopment: true,
  isTest: false,
  isProduction: false,
  env: 'development'
})

var bundler = webpack(webpackConfig);

browserSync({
  logFileChanges: false,
  notify: false,
  server: {
    baseDir: paths.srcDir,
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: false,
        stats: {
          chunks: false,
          chunkModules: false,
          colors: true
        }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    paths.srcDir + '/*.html',
    paths.srcDir + '/*.css'
  ]
})
