var path = require('path');

function resolveCwd () {
  var args = [].slice.call(arguments, 0);
  args.unshift(process.cwd());
  return path.join.apply(path, args);
}

module.exports = resolveCwd;
