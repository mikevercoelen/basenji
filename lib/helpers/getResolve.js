var path = require('path');
var resolveCwd = require('./resolveCwd');
var pkg = require(resolveCwd('package.json'));
var cwd = process.cwd();

function getResolve() {
  var frameworkNodeModules = path.resolve(__dirname + '../../../node_modules');

  var alias = {};
  var resolve = {
    root: [cwd, frameworkNodeModules],
    extensions: ['', '.js', '.json', '.jsx'],
    alias,
  };

  // resolve.fallback = [
  //   resolveCwd('ducks')
  // ]

  var name = pkg.name;
  alias[`${name}$`] = resolveCwd('index.js');
  alias[name] = cwd;

  alias['ducks'] = resolveCwd('src/ducks');
  alias['basenji'] = path.resolve(__dirname + '../../../browser/index.js');

  return resolve;
}

module.exports = getResolve;
