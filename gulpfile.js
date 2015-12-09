// step 2
// goal: Append some text to existing files!

var gulp = require('gulp'),
    through2 = require('through2');

gulp.task('default', function () {
  gulp.src(['src/*.txt'])
    .pipe(myGulpPlugin())
    .pipe(myGulpPlugin()) // do it twice to see what happens!
    .pipe(gulp.dest('dest'));
});



function myGulpPlugin () {
  return through2.obj(function (file, enc, done) {

    var contents = file.contents.toString();
    file.contents = new Buffer(contents + ' <- appended some stuff');

    this.push(file);
    done();
  });
}

// NOTE we cannot pass the same stream twice to pipe! Do not do it!