var path = require('path');

function getResolveLoader () {
  return {
    root: path.join(__dirname, '../../../node_modules')
  }
}

module.exports = getResolveLoader;
