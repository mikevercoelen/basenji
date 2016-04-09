var path = require('path');
var resolveCwd = require('./resolveCwd');

var basePath = path.resolve(__dirname, '../../');

var mainModulePath = resolveCwd('src', 'index.js');
var hotDevServerPath = path.resolve(basePath, 'node_modules/webpack/hot/dev-server');
var hotMiddlewarePath = path.resolve(basePath, 'node_modules/webpack-hot-middleware/client');

var srcDir = 'src';
var buildDir = 'build';

var srcPath = resolveCwd(srcDir);
var buildPath = resolveCwd(buildDir);
var stylesPath = path.resolve(srcDir, 'styles');
var assetsPath = path.resolve(srcDir, 'static');

module.exports = {
  basePath: basePath,
  mainModulePath: mainModulePath,
  hotDevServerPath: hotDevServerPath,
  hotMiddlewarePath: hotMiddlewarePath,
  srcDir: srcDir,
  buildDir: buildDir,
  srcPath: srcPath,
  buildPath: buildPath,
  stylesPath: stylesPath,
  assetsPath: assetsPath
}
