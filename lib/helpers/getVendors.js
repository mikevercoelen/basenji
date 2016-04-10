var path = require('path');
var _ = require('lodash');
var chalk = require('chalk');

var resolveCwd = require('./resolveCwd');
var vendors = require(resolveCwd('src/vendors.json'));
var package = require(resolveCwd('package.json'));

var defaultVendors = [
  'react',
  'react-dom',
  'redux',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux-promise',
  'redux-thunk',
  'classnames',
  'redux-actions',
  'react-addons-css-transition-group'
];

function getVendors () {
  var projectDeps = package.dependencies || {};

  _.filter(vendors, function (dep) {
    if (projectDeps[dep] || (defaultVendors.indexOf(dep) > -1)) {
      return true;
    }

    console.log(chalk.red("Package \"" + dep + "\" was not found as an npm dependency in package.json; " + "it won't be included in the webpack vendor bundle.\n       Consider removing it from ~/vendor.json"));
  });

  for (var dep in projectDeps) {
    if (vendors.indexOf(dep) === -1) {
      console.log(chalk.green(
        `${dep} should be added to ~/vendor.json. This speeds up the build process.`
      ))
    }
  }

  return _.union(defaultVendors, vendors);
}

module.exports = getVendors;
