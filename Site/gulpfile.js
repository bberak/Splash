var _ = require('lodash/dist/lodash.underscore');
var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');
var sass = require('gulp-sass');
var react = require('gulp-react');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');
var utils = require('gulp-util');
var mocha = require('gulp-mocha');
var browsersync = require('browser-sync');

gulp.task('clean', function() {
  return gulp.src(['build/*'], {read: false}).pipe(clean());
});

// Browserify scripts

gulp.task('scripts', function() {
    gulp.src('src/scripts/app.js')
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest('build/scripts'))
        .pipe(uglify())
    	.pipe(rename({suffix: '.min'}))
    	.pipe(gulp.dest('build/scripts'));
});

// Compile and minify sass

gulp.task('styles', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/'))
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/'));
});

// Images

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('build/images/'));
});

// Views (html)

gulp.task('html', function() {
	return gulp.src('src/html/**')
		.pipe(gulp.dest('build'));
});

// Browser Sync

gulp.task('browsersync', ['default'], function() {
	browsersync.init(['build/**'], {
		server: {
			baseDir: 'build',
			directory: true
		}
	});
});

// Watching

gulp.task('watch', ['browsersync'], function() {
	if (!global.isWatching) {
		global.isWatching = true;
		gulp.watch('src/scripts/**', ['scripts']);
		gulp.watch('src/styles/**', ['styles']);
		gulp.watch('src/images/**', ['images']);
		gulp.watch('src/html/**', ['html']);
	}
});

gulp.task('default', ['clean'], function() {
  return gulp.start('scripts', 'styles', 'images', 'html', 'watch');
});