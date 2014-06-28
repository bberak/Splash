var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['build'], function() {
	browserSync.init(['../../Site/Scripts/**',
					   '../../Site/Styles/**',
					   '../../Site/Views/**',
					   '../../Site/Images/**',
					   '../../Site/Fonts/**'], {
		server: {
			baseDir: '../../Site',
			index: "Views/index.html"
		}
	});
});
