var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var mocha = require('gulp-mocha');
var babelRegister = require('babel-core/register');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(livereload());
});

gulp.task('sass-production', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('browserify', function() {
  return browserify({entries: './src/main.js', debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(livereload());
});

gulp.task('browserify-production', function() {
  return browserify({entries: './src/main.js'})
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('test', function () {
  return gulp.src(['test/**/*.spec.js'])
    .pipe(mocha({
      require: ['./test/setup.js'],
      compilers: {
          js: babelRegister
      }
    }));
});

gulp.task('default', () => {
  livereload.listen();
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['browserify']);
  gulp.watch(['src/**', 'test/**'], ['test']);
});

gulp.task('build', ['sass-production', 'browserify-production']);
