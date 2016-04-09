var browserSync = require('browser-sync');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var historyApiFallback = require('connect-history-api-fallback');
var resolveCwd = require('./helpers/resolveCwd');

var createWebpackConfig = require('./createWebpackConfig');

var env = process.env.NODE_ENV || 'development';

var srcDir = 'src';
var distDir = 'dist';

var webpackConfig = createWebpackConfig({
  isDevelopment: true,
  isTest: false,
  isProduction: false,
  env: env,
  srcPath: resolveCwd('src'),
  distPath: resolveCwd('dist'),
  srcDir: srcDir,
  distDir: distDir
})

var bundler = webpack(webpackConfig);

browserSync({
  logFileChanges: false,
  notify: false,
  server: {
    baseDir: srcDir,
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
    srcDir + '/*.html',
    srcDir + '/*.css'
  ]
})
