const gulp = require('gulp');
const browserSync = require('browser-sync').create();





gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch("./**/*.js").on('change', browserSync.reload);
});
