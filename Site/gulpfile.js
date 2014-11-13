var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var webserver   = require('gulp-webserver');
var browserify  = require('gulp-browserify');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');

var sourcePaths = {
  styles:       ['src/styles/**/*'],
  images:       ['src/images/**/*'],
  html:         ['src/html/**/*'],
  scripts:      ['src/scripts/**/*'],
  rootScript:   'src/scripts/app.js'
};

var distPaths = {
  styles:   'build/styles',
  scripts:  'build/scripts',
  images:   'build/images',
  html:     'build'
};

var modulePaths = ['./node_modules', './src/scripts'];

var cleanPath = 'build/*';

var server = {
  host: 'localhost',
  port: '8001'
};

gulp.task('clean', function() {
  return gulp.src([cleanPath], {read: false})
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('styles', function () {
  gulp.src(sourcePaths.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(distPaths.styles));
});

gulp.task('scripts', function() {
    gulp.src(sourcePaths.rootScript)
        .pipe(plumber())
        .pipe(browserify({
          insertGlobals : false,
          debug: true,
          transform: ['reactify'],
          paths: modulePaths
        }))
        .pipe(gulp.dest(distPaths.scripts))
});

gulp.task('images', function() {
  return gulp.src(sourcePaths.images)
    .pipe(plumber())
    .pipe(gulp.dest(distPaths.images));
});

gulp.task('html', function() {
  return gulp.src(sourcePaths.html)
    .pipe(plumber())
    .pipe(gulp.dest(distPaths.html));
});

gulp.task('webserver', function() {
  gulp.src(distPaths.html)
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      open:             true
    }));
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles,  ['styles']);
  gulp.watch(sourcePaths.scripts, ['scripts']);
  gulp.watch(sourcePaths.images,  ['images']);
  gulp.watch(sourcePaths.html,    ['html']);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['styles', 'scripts', 'images', 'html'], 'watch', 'webserver', callback);
});

gulp.task('default', ['build']);