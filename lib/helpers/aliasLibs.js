var path = require('path');
var paths = require('./paths');
var env = require('./env');

function libPath (location) {
  return path.resolve(paths.baseNodeModules, location);
}

// https://github.com/survivejs/webpack/issues/35
// http://survivejs.com/webpack/developing-with-webpack/optimizing-development/
// http://webpack.github.io/docs/configuration.html#resolve-alias

var aliasLibs = (env.isTest) ? [] : [{
  name: 'react$',
  path: libPath('react/dist/react.min.js')
}, {
  name: 'react-dom',
  path: libPath('react-dom/dist/react-dom.min.js'),
  parse: true
}, {
  name: 'redux',
  path: libPath('redux/dist/redux.min.js')
}, {
  name: 'react-redux',
  path: libPath('react-redux/dist/react-redux.min.js'),
  parse: true
}, {
  name: 'redux-thunk',
  path: libPath('redux-thunk/dist/redux-thunk.min.js')
}]

module.exports = aliasLibs;
