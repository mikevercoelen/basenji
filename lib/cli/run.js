#!/usr/bin/env node

require('colorful').colorful();

var program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'basenji run start'.to.magenta.color, 'starts development');
  console.log('    $', 'basenji run build'.to.magenta.color, 'creates a build version of your app');
  console.log('    $', 'basenji run test'.to.magenta.color, 'tests your application');
  console.log();
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else if (task === 'start') {
  require('../start');
} else if (task === 'build') {
  require('../build');
} else if (task === 'test') {
  require('../test');
} else {
  // console.log('bobcat run', task);
  // var gulp = require('gulp');
  // require('../gulpfile');
  // gulp.start(task);
}
