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

gulp.task('serveG', function() {
  browserSync({
    server: {
      baseDir: './_generated'
    }
  });

  gulp.watch(['**/*.htm', '*.css'], {cwd: './_generated'}, reload);
});

gulp.task('clean:docs', function cleanDocsFolder () {
  return del([
    '../docs/**/*'
  ],{force:true});
});

//Rebuilds the site manually
//TODO - how to get it moving stuff over automatically? or when building we just save into docs?

/*
move all this logic into the node project?
use the magic of gulp for file copy though
*/
gulp.task('rebuild',['clean:docs'],function copyStaticContent(){
    gulp.src(['../static/**/*']).pipe(gulp.dest('../docs'));
    gulp.src(['../build/_generated/**/*']).pipe(gulp.dest('../docs'));
    gulp.src(['../CNAME']).pipe(gulp.dest('../docs'));
})