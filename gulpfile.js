var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    argv = process.argv,
    jade = require('jade'),
    gjade = require('gulp-jade');

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 */
var buildWebpack = require('ionic-gulp-webpack-build');
var buildSass = require('ionic-gulp-sass-build');
var copyHTML = require('ionic-gulp-html-copy');
var copyFonts = require('ionic-gulp-fonts-copy');

gulp.task('watch', ['sass', 'html', 'fonts'], function(){
  gulpWatch('app/**/*.scss', function(){ gulp.start('sass'); });
  gulpWatch('app/**/*.html', function(){ gulp.start('html'); });
  gulpWatch('app/**/*.jade', function(){ gulp.start('markup'); });
  return buildWebpack({ watch: true });
});
gulp.task('build', ['sass', 'markup', 'html', 'fonts'], buildWebpack);
gulp.task('sass', buildSass);
gulp.task('html', copyHTML);
gulp.task('fonts', copyFonts);
gulp.task('clean', function(done){
  del('www/build', done);
});

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['build']);
gulp.task('deploy:before', ['build']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);






// I love Jade, so I´ll add it to my Ionic project
gulp.task('markup', function() {
  console.log('Converting jade')
  gulp.src('./app/**/*.jade')
    .pipe(gjade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./www/build'));
});
