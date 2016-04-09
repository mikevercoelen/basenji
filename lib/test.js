var KarmaServer = require('karma').Server;

var karmaServer = new KarmaServer({
  configFile: __dirname + '/karma.config.js',
  singleRun: true
}, function () {
  console.log('DONE!');
}).start();
