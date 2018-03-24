var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(){
	gulp.src('./scss/styles.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.reload({stream: true}));
});

// Browser Sync
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

   gulp.watch('./scss/*.scss', ['styles']);
   gulp.watch('./**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'serve']);