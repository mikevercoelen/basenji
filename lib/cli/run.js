#!/usr/bin/env node

require('colorful').colorful();

var program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'bobcat run start'.to.magenta.color, 'starts development');
  console.log('    $', 'bobcat run build'.to.magenta.color, 'creates a build version of your app');
  console.log('    $', 'bobcat run test'.to.magenta.color, 'tests your application');
  console.log();
});

program.parse(process.argv);

var task = program.args[0];

if (!task) {
  program.help();
} else if (task === 'start') {
  require('../start/');
} else {
  // console.log('bobcat run', task);
  // var gulp = require('gulp');
  // require('../gulpfile');
  // gulp.start(task);
}
