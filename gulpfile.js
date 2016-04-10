var path = require('path');
var gulp = require('gulp');
var gitbook = require('gitbook');
var Q = require('q');
var ghPages = require('gulp-gh-pages');

var DOCS_DIR = 'docs';
var DOCS_OUTPUT_DIR = '.book';

gulp.task('docs:build', function () {
  var book = new gitbook.Book(DOCS_DIR, {
    config: {
      output: DOCS_OUTPUT_DIR,
      plugins: ['prism', '-highlight']
    }
  });

  return Q
    .all(book.parse())
    .then(function () {
      return book.generate('website');
    });
})

gulp.task('docs', ['docs:build'], function () {
  return gulp
    .src('**/*', {
      cwd: path.resolve(__dirname, DOCS_OUTPUT_DIR)
    })
    .pipe(ghPages());
})
