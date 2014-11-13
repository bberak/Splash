var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-sass');
var webserver   = require('gulp-webserver');
var browserify  = require('gulp-browserify');
var clean       = require('gulp-clean');
var runSequence = require('run-sequence');

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
    rootScript: 'src/scripts/app.js',
    modulePaths: ['./node_modules', './src/scripts']
  },
  cleanPaths: ['build/*'],
  server: {
    host: 'localhost',
    port: '8001'
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
    .pipe(gulp.dest(config.dist.styles));
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
});

gulp.task('images', function() {
  return gulp.src(config.src.images)
    .pipe(plumber())
    .pipe(gulp.dest(config.dist.images));
});

gulp.task('html', function() {
  return gulp.src(config.src.html)
    .pipe(plumber())
    .pipe(gulp.dest(config.dist.html));
});

gulp.task('webserver', function() {
  gulp.src(config.dist.html)
    .pipe(webserver({
      host:         config.server.host,
      port:         config.server.port,
      livereload:   true,
      open:         true
    }));
});

gulp.task('watch', function(){
  gulp.watch(config.src.styles,  ['styles']);
  gulp.watch(config.src.scripts, ['scripts']);
  gulp.watch(config.src.images,  ['images']);
  gulp.watch(config.src.html,    ['html']);
});

gulp.task('build', function(callback) {
  runSequence('clean', ['styles', 'scripts', 'images', 'html'], 'watch', 'webserver', callback);
});

gulp.task('default', ['build']);