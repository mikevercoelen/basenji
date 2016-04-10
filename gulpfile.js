var path = require('path');
var gulp = require('gulp');
var gitbook = require('gitbook');
var Q = require('q');
var ghPages = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();
var watch = require('gulp-watch');

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
    })
    .done(function () {
      browserSync.reload();
    })
});

gulp.task('docs:server', ['docs:build'], function (callback) {
  browserSync.init({
    server: {
      baseDir: './' + DOCS_OUTPUT_DIR
    }
  }, callback);
})

gulp.task('docs:dev', ['docs:server'], function () {
  watch([
    'docs/**/*'
  ], function () {
    gulp.start('docs:build');
  });
});

gulp.task('docs', ['docs:build'], function () {
  return gulp
    .src('**/*', {
      cwd: path.resolve(__dirname, DOCS_OUTPUT_DIR)
    })
    .pipe(ghPages());
});
