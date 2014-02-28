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
gulp.task('default', ['scripts']);
