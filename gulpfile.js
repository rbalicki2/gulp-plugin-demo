// Step 4
// Goal: Create a pipe utility that waits until all files have finished
// before emitting all of the files, if and only if none have emitted an
// error.

var gulp = require('gulp'),
    through2 = require('through2');

gulp.task('no-error', function () {
  gulp.src(['src/*.txt'])
    .pipe(hooverDam())
    .pipe(gulp.dest('dest'));
});

gulp.task('error', function () {
  gulp.src(['src/*.txt'])
    .pipe(throwError())
    .pipe(hooverDam())
    .pipe(gulp.dest('dest'));
});

// hoover dam because it blocks the stream! HAR HAR HAR HAR HAR HAR
function hooverDam () {
  var files = [],
      error = false;

  var stream = through2.obj(singleFileEncountered, allFilesCompleted);

  // use stream.once to not cause an infinite loop
  stream.once('pipe', function (source) {
    // uncaught errors will result in a thrown exception, but we don't want that.
    // so, we can unpipe the stream, add an error handler, and then repipe it
    console.log('The stream was piped');

    source.unpipe(stream);
    source.on('error', errorHandler);
    source.pipe(stream);

  });

  return stream;

  /////////////

  function errorHandler (err) {
    console.log('Encountered an error!', err);
    error = true;
    stream.end();
  }

  function singleFileEncountered (file, enc, done) {
    files.push(file);
    done();
  }

  function allFilesCompleted (done) {
    var fileStream = this;

    if (error) {
      console.log('Done, but error encountered in the past, so no files are pushed on');
    } else {
      console.log('Done, no error encountered in the past, files are being flushed'); 
      files.forEach(fileStream.push.bind(fileStream));
    }

    if (done) {
      done();
    }
  }
}

function throwError () {
  var stream = through2.obj(function (file, enc, done) {
    done(new Error('You tried to chew gum and walk at the same time and fell in a ditch'));
  });

  return stream;
}