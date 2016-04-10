var env = require('./env');

module.exports = {
  'process.env': {
    'NODE_ENV': JSON.stringify(env.env)
  },
  'NODE_ENV': env.env,
  '__DEV__': env.isDevelopment,
  '__PROD__': env.isProduction,
  '__TEST__': env.isTest,
  '__DEBUG__': env.isDevelopment,
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}
