var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var del = require('del');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var uncss = require('gulp-uncss');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  src: {
    css: ['./src/css/libs/*.css', './src/css/**/*.styl', 'src/css/**/*.css'],
    jsx: ['./src/jsx/**/*.jsx'], //Src JS files on which to watch
    appJs: ['./src/jsx/app.jsx'], //Main JS file, browserify finds the deps
    html: ['./src/*.html']
  },
  dest: {
    dist: './dist',
    css: './dist/css',
    js: './dist/js'
  }
};

gulp.task('clean:css', function(done) {
  del(['./dist/css/**/*.css'], done);
});

gulp.task('clean:js', function(done) {
  del(['./dist/js/**/*.js'], done);
});

gulp.task('clean:html', function(done) {
  del(['./dist/*.html'], done);
});

gulp.task('css', ['clean:css'], function() {
  return gulp.src(paths.src.css)
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    //.pipe(uncss({
    //  html: ['./dist/index.html'] // why this not work?
    //}))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});

gulp.task('jsx', ['clean:js'], function() {
  browserify({
    entries: paths.src.appJs,
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest(paths.dest.js))
  .on('end', reload);
});

gulp.task('html', ['clean:html'], function() {
  gulp.src(paths.src.html)
  .pipe(gulp.dest(paths.dest.dist))
  .on('end', reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch(paths.src.css, ['css']);
    gulp.watch(paths.src.jsx, ['jsx']);
    gulp.watch(paths.src.html, ['html']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['html', 'jsx', 'css'], function() {
  gulp.task('serve');
});
