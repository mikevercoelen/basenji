#!/usr/bin/env node

require('colorful').colorful();

var program = require('commander');

program.on('--help', () => {
  console.log('  Usage:'.to.bold.blue.color);
  console.log();
  console.log('    $', 'bobcat init'.to.magenta.color, 'creates a new project');
  console.log();
});

program.parse(process.argv);

require('../initializer');
