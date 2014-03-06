var gulp = require('gulp');

var coffee = require('gulp-coffee');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: ['*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*'
};

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  return gulp.src(paths.scripts)
    .pipe(watch())
    .pipe(coffee())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(livereload());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'watch']);

var livereload = require('gulp-livereload'),
    dest = 'build';

gulp.task('staticsvr', function(next) {
  var staticS = require('node-static'),
      server = new staticS.Server('./' + dest),
      port = 80;
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(port));
    next();
  });
});

gulp.task('watch', ['staticsvr'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);
  });
});
