#!/usr/bin/env node

require('colorful').colorful();

var program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'basenji run start'.to.magenta.color, 'starts development');
  console.log('    $', 'basenji run build'.to.magenta.color, 'creates a build version of your app');
  console.log('    $', 'basenji run build-server'.to.magenta.color, 'creates a build version and start a server');
  console.log('    $', 'basenji run test'.to.magenta.color, 'tests your application');
  console.log();
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else if (task === 'start') {
  process.env.NODE_ENV = 'development';
  require('../start');
} else if (task === 'build') {
  process.env.NODE_ENV = 'production';
  require('../build')();
} else if (task === 'test') {
  process.env.NODE_ENV = 'test';
  require('../test');
} else if (task === 'build-server') {
  process.env.NODE_ENV = 'production';
  require('../build-server');
} else {
  // console.log('bobcat run', task);
  // var gulp = require('gulp');
  // require('../gulpfile');
  // gulp.start(task);
}
