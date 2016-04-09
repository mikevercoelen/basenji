var cssnano = require('cssnano');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var paths = require('../helpers/paths');
var env = require('../helpers/env');

module.exports = function styles (webpackConfig) {
  var cssLoader = [
    'css?modules',
    'sourceMap',
    '-minimize',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    include: /src/,
    loaders: [
      'style',
      cssLoader,
      'postcss',
      'sass?sourceMap'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    include: /src/,
    loaders: [
      'style',
      cssLoader,
      'postcss'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    exclude: /src/,
    loaders: [
      'style',
      'css?sourceMap',
      'postcss',
      'sass?sourceMap'
    ]
  })

  webpackConfig.module.loaders.push({
    test: /\.css$/,
    exclude: /src/,
    loaders: [
      'style',
      'css?sourceMap',
      'postcss'
    ]
  })

  webpackConfig.sassLoader = {
    includePaths: paths.stylesPath
  }

  webpackConfig.postcss = [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ]

  if (!env.isDevelopment) {
    // when we don't know the public path (we know it only when HMR is enabled [in development]) we
    // need to use the extractTextPlugin to fix this issue:
    // http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
    function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

    webpackConfig.module.loaders.filter(function (loader) {
      return loader.loaders && loader.loaders.find(function (name) {
        return (/css/.test(name.split('?')[0])
        );
      });
    }).forEach(function (loader) {
      var _loader$loaders = _toArray(loader.loaders);

      var first = _loader$loaders[0];

      var rest = _loader$loaders.slice(1);

      loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
      delete loader.loaders;
    });

    webpackConfig.plugins.push(
      new ExtractTextPlugin('[name].[contenthash].css', {
        allChunks: true
      })
    )
  }

  return webpackConfig;
}
