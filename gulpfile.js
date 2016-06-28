var gulp = require('gulp');
var gulp = require('gulp-shell');
var runSequence = require('run-sequence');

gulp.task('start', shell.task([
  'live-server --open=app'
]))

gulp.task('serve.dev', function(done) {
    runSequence(
        'start',
        done
    );
});
