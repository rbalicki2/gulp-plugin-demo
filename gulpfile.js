// demo 1
// goal set up a basic gulp file that writes from src
// and writes to dest

var gulp = require('gulp');

gulp.task('default', function () {
  gulp.src(['src/*.txt'])
    .pipe(gulp.dest('dest'));
});
