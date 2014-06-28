var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
	browserSync.init(['../../Site/**'], {
		server: {
			baseDir: '../../Site',
			index: "Views/index.html"
		}
	});
});
