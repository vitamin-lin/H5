var gulp = require('gulp'),
  	less = require('gulp-less'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del'),
  	browserSync = require('browser-sync'),
    proxy = require('http-proxy-middleware');

var paths = {
  styles: {
    src: 'src/less/*.less',
    dest: 'build/style/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'build/script/'
  },
}

/* reduce styles */
function stylesDev() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(gulp.dest(paths.styles.dest))
}
function stylesBuild() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest))
}
function Build_static() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('dist/static'))
}

function Build_build() {
  return gulp.src('build/**/*')
    .pipe(gulp.dest('dist/build'))
}

function Build_lib() {
  return gulp.src('lib/**/*')
    .pipe(gulp.dest('dist/lib'))
}

function Build_html() {
  return gulp.src('*.html')
    .pipe(gulp.dest('dist/'));
}
function Build_js() {
  return gulp.src(['./src/js/**/*', '!./src/js/main.js'])
    .pipe(gulp.dest('build/script/'))
    .pipe(gulp.dest('dist/build/script/'));
}


/* reduce scripts */
function scriptsDev() {
  return browserify('./src/js/main.js')
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(paths.scripts.dest));
}
function scriptsBuild() {
  return browserify('./src/js/main.js')
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
}


/* clean old file */
function clean() {
  return del([ 'dist' ]);
}

/* eslint */
function eslint() {
  return gulp.src('src/js/*.js')
    .pipe(eslint({configFle:"./.eslintrc.json"}))
    .pipe(eslint.format())
}

/* configure proxy middleware */
var proxyApis = [
  // getRewards
  proxy('/new-year-lucky-draw', { target: 'http://app.qa.medlinker.com/activity/new-year-lucky-draw', changeOrigin: true }),
]

/* browser-sync server */
function hot() {
  browserSync.init({
    server: {
      baseDir: './',
      middleware: proxyApis
    }
  });
}

/* watch */
var htmlWatcher = gulp.watch('*.html')
var scriptWatcher = gulp.watch(paths.scripts.src)
var styleWatcher = gulp.watch(paths.styles.src)
htmlWatcher.on('change', browserSync.reload)
scriptWatcher.on('change', function() {
  scriptsDev()
  browserSync.reload()
})
styleWatcher.on('change', function() {
  stylesDev()
  browserSync.reload()
})

/* 
  task
    parallel: 并行执行
    series: 顺序执行
*/
var dev = gulp.series(gulp.parallel(stylesDev, scriptsDev, Build_js), hot)
var build = gulp.series(clean, gulp.parallel(stylesBuild, scriptsBuild, Build_static, Build_lib, Build_build, Build_html, Build_js))

gulp.task('dev', dev)
gulp.task('build', build)