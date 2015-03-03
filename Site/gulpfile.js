var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var connect     = require('gulp-connect');
var browserify  = require('gulp-browserify');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');
var opn         = require('opn');

var config = {
  src: {
    styles:     ['src/styles/**/*'],
    images:     ['src/images/**/*'],
    html:       ['src/html/**/*'],
    scripts:    ['src/scripts/**/*']
  },
  dist: {
    styles:   'build/styles',
    scripts:  'build/scripts',
    images:   'build/images',
    html:     'build'
  },
  browserify: {
    rootScript: 'src/scripts/start.js',
    modulePaths: ['./node_modules', './src/scripts']
  },
  cleanPaths: ['build/*'],
  server: {
    host: 'localhost',
    port: 8001
  }
};

gulp.task('clean', function() {
  return gulp.src(config.cleanPaths, {read: false})
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('styles', function () {
  gulp.src(config.src.styles)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.dist.styles))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
    gulp.src(config.browserify.rootScript)
      .pipe(plumber())
      .pipe(browserify({
        insertGlobals : false,
        debug: true,
        transform: ['reactify'],
        paths: config.browserify.modulePaths
      }))
      .pipe(gulp.dest(config.dist.scripts))
      .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src(config.src.images)
    .pipe(plumber())
    .pipe(gulp.dest(config.dist.images))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  return gulp.src(config.src.html)
    .pipe(plumber())
    .pipe(gulp.dest(config.dist.html))
    .pipe(connect.reload());
});

gulp.task('watch', function(){
  gulp.watch(config.src.styles,  ['styles']);
  gulp.watch(config.src.scripts, ['scripts']);
  gulp.watch(config.src.images,  ['images']);
  gulp.watch(config.src.html,    ['html']);
});

gulp.task('server', function() {
  connect.server({
    root: config.dist.html,
    host: config.server.host,
    port: config.server.port,
    livereload: true
  });
});

gulp.task('browser', function() {
  opn('http://' + config.server.host + ":" + config.server.port);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['styles', 'scripts', 'images', 'html'], 'watch', 'server', 'browser', callback);
});

gulp.task('default', ['build']);