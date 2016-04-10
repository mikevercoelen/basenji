var fs = require('fs');

module.exports = function getGitRepoUrl (callback) {
  fs.readFile('.git/config', 'utf8', function (error, gconf) {
    if (error || !gconf) {
      return callback();
    }

    gconf = gconf.split(/\r?\n/)
    var i = gconf.indexOf('[remote "origin"]')

    if (i !== -1) {
      var u = gconf[i + 1]
      if (!u.match(/^\s*url =/)) u = gconf[i + 2]
      if (!u.match(/^\s*url =/)) u = null
      else u = u.replace(/^\s*url = /, '')
    }

    if (u && u.match(/^git@github.com:/)) {
      u = u.replace(/^git@github.com:/, 'https://github.com/')
    }

    return callback(null, u);
  })
}
