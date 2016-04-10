var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var history = require('connect-history-api-fallback');

var paths = require('./helpers/paths');
var webpackConfig = require('./webpack.config');

var bundler = webpack(webpackConfig);

browserSync({
  logFileChanges: false,
  notify: false,
  server: {
    baseDir: paths.srcDir,
    middleware: [
      history(),
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        hot: true,
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
