#!/usr/bin/env node

'use strict';

require('colorful').colorful();

var program = require('commander');
var packageInfo = require('../../package.json');

program
  .version(packageInfo.version)
  .command('init [name]', 'create a new basenji project')
  .command('run [task]', 'runs a basenji task')
  .parse(process.argv);

var proc = process.runningCommand;

// https://github.com/tj/commander.js/pull/260
var proc = program.runningCommand;
if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

var subCmd = program.args[0];

if (!subCmd && subCmd !== 'init' && subCmd !== 'run') {
  program.help();
}
