let gulp = require('gulp'),
    webpack = require('webpack-stream');

gulp.task('js', function() {
  return gulp.src('./src/client/**/*.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['js'], function() {
  gulp.watch('./src/client/**/*.js', ['js']);
});

gulp.task('default', ['watch']);
