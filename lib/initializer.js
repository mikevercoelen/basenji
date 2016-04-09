var inquirer = require('inquirer');
var path = require('path');
var gi = require('git-info');
var gulp = require('gulp');
var template = require('gulp-template');
var rename = require('gulp-rename');
var _ = require('underscore.string');
var handlebars = require('gulp-compile-handlebars');
var install = require('gulp-install');

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

inquirer.prompt(prompts, function (answers) {
  var name = _.slugify(answers.name);
  var description = answers.description;

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
