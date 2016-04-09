var path = require('path');
var resolveCwd = require('./resolveCwd');

var basePath = path.resolve(__dirname, '../../');
var baseNodeModules = path.resolve(basePath, 'node_modules');

var mainModulePath = resolveCwd('src', 'index.js');
var hotDevServerPath = path.resolve(baseNodeModules, 'webpack/hot/dev-server');
var hotMiddlewarePath = path.resolve(baseNodeModules, 'webpack-hot-middleware/client');

var srcDir = 'src';
var buildDir = 'build';
var testDir = 'tests';

var srcPath = resolveCwd(srcDir);
var buildPath = resolveCwd(buildDir);
var testPath = resolveCwd(testDir);
var stylesPath = path.resolve(srcDir, 'styles');
var assetsPath = path.resolve(srcDir, 'static');

module.exports = {
  basePath: basePath,
  mainModulePath: mainModulePath,
  hotDevServerPath: hotDevServerPath,
  hotMiddlewarePath: hotMiddlewarePath,
  baseNodeModules: baseNodeModules,
  testDir: testDir,
  srcDir: srcDir,
  buildDir: buildDir,
  srcPath: srcPath,
  testPath: testPath,
  buildPath: buildPath,
  stylesPath: stylesPath,
  assetsPath: assetsPath
}
