// Step 3
// Goal: Create a small, useful logger plugin! If you're not sure what
// files are being picked up by gulp.src, this is a small utility you can
// use to inspect your pipes!

var gulp = require('gulp'),
    through2 = require('through2');

gulp.task('default', function () {
  gulp.src(['src/*.txt'])
    .pipe(logger())
    .pipe(gulp.dest('dest'));
});



function logger () {
  return through2.obj(function (file, enc, done) {

    console.log('Logger: encountered file: ' + file.path);
    console.log('First line of file:');
    console.log(file.contents.toString().split('\n')[0]);
    console.log();

    this.push(file);
    done();
  });
}