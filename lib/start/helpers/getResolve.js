var path = require('path');
var resolveCwd = require('./resolveCwd');
var pkg = require(resolveCwd('package.json'));
var cwd = process.cwd();

function getResolve() {
  var bobcatNodeModules = path.resolve(__dirname + '../../../../node_modules');

  var alias = {};
  var resolve = {
    root: [cwd, bobcatNodeModules],
    extensions: ['', '.js'],
    alias,
  };

  var name = pkg.name;
  alias[`${name}$`] = resolveCwd('index.js');
  alias[name] = cwd;

  alias['bobcat'] = path.resolve(__dirname + '../../../../browser/index.js');

  return resolve;
}

module.exports = getResolve;
