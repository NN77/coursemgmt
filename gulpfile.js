var gulp = require('gulp');
var shell = require('gulp-shell');
var postcss = require('gulp-postcss');
var precss = require('precss');
var cssnext = require('postcss-cssnext');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');

var cssSourceCode = './app/assets/app.css';
var cssDest = './app';

var pugSourceCode = './app/src/**/*.pug';
var htmlDest = './app/src/';

var jsSourceCode = ['!app/src/**/*.spec.js', '!app/dist', 'app/**/*.js'];

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

gulp.task('build.html', function() {
    return gulp.src(pugSourceCode)
      .pipe(pug())
      .pipe(gulp.dest(htmlDest));
});

// gulp.task('build.js', function () {
//     return gulp.src(jsSourceCode, {base: './app'})
//         .pipe(traceur({
//             modules: 'amd',
//             moduleName : true
//         }))
//         .pipe(concat('bundle.js'))
//         .pipe(gulp.dest('app/dist'))
// });

gulp.task('watch.css', function() {
    gulp.watch(cssSourceCode, ['build.css']);
});

gulp.task('watch.html', function() {
    gulp.watch(pugSourceCode, ['build.html']);
});

// gulp.task('watch.js', function() {
//     gulp.watch(jsSourceCode, ['build.js']);
// });

gulp.task('start', shell.task([
  'live-server --open=app'
]))

gulp.task('serve.dev', function() {
    runSequence(
        ['watch.css', 'watch.html', 'start']
    );
});
