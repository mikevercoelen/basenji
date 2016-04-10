var path = require('path');
var resolveCwd = require('./resolveCwd');
var paths = require('./paths');
var pkg = require(resolveCwd('package.json'));
var cwd = process.cwd();
var aliasLibs = require('./aliasLibs');
var env = require('./env');

// http://survivejs.com/webpack/developing-with-webpack/optimizing-development/

function getResolve() {
  var frameworkNodeModules = path.resolve(__dirname + '../../../node_modules');

  var alias = {};
  var resolve = {
    root: [cwd, frameworkNodeModules],
    extensions: ['', '.js', '.json'],
    moduleDirectories: ['node_modules'],
    alias,
  };

  var name = pkg.name;
  alias[`${name}$`] = resolveCwd('index.js');
  alias[name] = cwd;

  alias['srcRoot'] = resolveCwd('src');
  alias['ducks'] = resolveCwd('src/ducks');
  alias['tests'] = resolveCwd('tests');
  alias['basenji'] = path.resolve(__dirname + '../../../browser/index.js');
  alias['components'] = resolveCwd('src/components');
  alias['containers'] = resolveCwd('src/containers');
  alias['views'] = resolveCwd('src/views');
  alias['styles'] = resolveCwd('src/styles');
  alias['helpers'] = resolveCwd('src/helpers');
  alias['api'] = resolveCwd('src/api');
  alias['icons'] = resolveCwd('src/icons');
  alias['constants'] = resolveCwd('src/constants');

  if (!env.isTest) {
    aliasLibs.forEach(function (lib) {
      alias[lib.name] = lib.path;
    });
  }

  return resolve;
}

module.exports = getResolve;
