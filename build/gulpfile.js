var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var del = require('del');

// watch files for changes and reload
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: '../docs'
    }
  });

  gulp.watch(['**/*.htm', '*.css'], {cwd: '../docs'}, reload);
});

gulp.task('clean:docs', function cleanDocsFolder () {
  return del([
    '../docs/**/*',    
    '!../docs/ssi'
  ]);
});