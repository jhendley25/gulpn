// The default task (called when you run `gulp` from cli)
var gulp = require('gulp');

var coffee = require('gulp-coffee');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('default', ['watch']);

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
