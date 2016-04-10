var browserSync = require('browser-sync');
var webpack = require('webpack');
var history = require('connect-history-api-fallback');
var compression = require('compression');
var build = require('./build');

var paths = require('./helpers/paths');

build(function () {
  browserSync({
    minify: false,
    server: {
      baseDir: paths.buildDir,
      middleware: [
        history(),
        compression()
      ]
    }
  });
});
