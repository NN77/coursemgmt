var gulp = require('gulp');
var shell = require('gulp-shell');
var postcss = require('gulp-postcss');
var precss = require('precss');
var cssnext = require('postcss-cssnext');
var runSequence = require('run-sequence');

var cssSourceCode = './app/assets/app.css';
var cssDest = './app';

gulp.task('build.css', function() {
  const PROCESSORS = [
    precss(),
    cssnext({
      browsers: ['last 2 version', 'safari 5', 'ie > 9', 'opera 12.1', 'ios 6', 'android 2.3'],
      compress: true
    })
  ];
    return gulp.src(cssSourceCode)
      .pipe(postcss(PROCESSORS))
      .pipe(gulp.dest(cssDest));
});

gulp.task('watch.css', function() {
    gulp.watch(cssSourceCode, ['build.css']);
});

gulp.task('start', shell.task([
  'live-server --open=app'
]))

gulp.task('serve.dev', function() {
    runSequence(
        ['watch.css', 'start']
    );
});
