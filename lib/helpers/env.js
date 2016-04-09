var env = process.env.NODE_ENV || 'development';

var isDevelopment = (env === 'development');
var isProduction = (env === 'production');
var isTest = (env === 'test');

module.exports = {
  env: env,
  isDevelopment: isDevelopment,
  isProduction: isProduction,
  isTest: isTest
}
