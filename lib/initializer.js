var inquirer = require('inquirer');
var path = require('path');
var gi = require('git-info');
var gulp = require('gulp');
var template = require('gulp-template');
var rename = require('gulp-rename');
var _ = require('underscore.string');
var handlebars = require('gulp-compile-handlebars');
var install = require('gulp-install');
var package = require('../package.json');

var CWD = process.cwd();

var DEFAULT_NAME = path.basename(CWD);
var DEFAULT_DESCRIPTION = '';

var prompts = []

prompts.push({
  type: 'input',
  name: 'name',
  message: 'name:',
  default: DEFAULT_NAME
});

prompts.push({
  type: 'input',
  name: 'description',
  message: 'description:'
});

inquirer.prompt(prompts).then(function (answers) {
  var name = _.slugify(answers.name);
  var description = answers.description;

  var deps = package.dependencies;
  var templateDeps = [
    'babel-core',
    'babel-eslint',
    'babel-plugin-add-module-exports',
    'babel-plugin-react-transform',
    'babel-plugin-transform-decorators-legacy',
    'babel-plugin-transform-react-constant-elements',
    'babel-plugin-transform-react-display-name',
    'babel-plugin-transform-react-remove-prop-types',
    'babel-plugin-transform-runtime',
    'babel-preset-es2015',
    'babel-preset-react',
    'babel-preset-stage-0',
    'eslint',
    'eslint-config-standard',
    'eslint-config-standard-react',
    'eslint-plugin-babel',
    'eslint-plugin-promise',
    'eslint-plugin-react',
    'eslint-plugin-standard'
  ];

  var depsString = '';
  var depsLength = templateDeps.length;
  var i = 1;

  for (var d in deps) {
    var version = deps[d]

    if (templateDeps.indexOf(d) > -1) {
      depsString += '"' + d + '": "' + version + '"';

      if (i !== depsLength) {
        depsString += ', \n\t\t';
      }

      i++;
    }
  }

  answers.devDependencies = depsString;

  gulp
    .src([
      __dirname + '/templates/**',
      '!' + __dirname + '/templates/src/static/favicon.ico'
    ])
    .pipe(handlebars(answers))
    .pipe(rename(function (file) {
      if (file.basename[0] === '_') {
        file.basename = '.' + file.basename.slice(1);
      }
    }))
    .pipe(gulp.dest('./'))
    .on('end', function () {
      gulp
        .src([
          __dirname + '/templates/src/static/favicon.ico'
        ])
        .pipe(gulp.dest('./src/static/'))
        .on('end', function () {
          console.log('It is done. Installing dependencies...');

          gulp
            .src('./package.json')
            .pipe(install())
            .on('end', function () {
              console.log('Installed all dependencies. Run `npm start` to start working.');
            })
        })
    })
});
