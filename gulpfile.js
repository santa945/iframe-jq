const gulp = require('gulp')
const browserSync = require('browser-sync')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const proxy = require('http-proxy-middleware')

// Static server
const requestProxy = proxy('/jbcz-admin/cc-gateway/commonservice/cc/api/tele', {
  target: 'https://xtbg.digitalgd.com.cn/jbcz-admin/cc-gateway/commonservice/cc/api/tele',
  changeOrigin: true,
  pathRewrite: {
    '^/jbcz-admin/cc-gateway/commonservice/cc/api/tele': ''
  }
})

gulp.task('server', function() {
  browserSync({
    port: 8080,
    server: {
      baseDir: ['src']
    },
    middleware: [requestProxy]
  })

  gulp.watch(['./src/*.html', './src/*.css', './src/*.js'], {
    cwd: './'
  }, browserSync.reload)
})

function scripts() {
  return gulp.src('./src/index.js').pipe(uglify()).pipe(gulp.dest('build'))
}

function styles() {
  return gulp.src('./src/index.css').pipe(uglifycss()).pipe(gulp.dest('build'))
}

function html() {
  return gulp.src('./src/*.html').pipe(gulp.dest('build'))
}

const build = gulp.series(scripts, styles, html)

exports.build = build
