var gulp         = require('gulp');
var sass         = require('gulp-sass');
var prefix       = require('gulp-autoprefixer'); // 添加浏览器私有前缀
var minifyHtml   = require('gulp-htmlmin'); // 压缩html
var minifyCss    = require('gulp-minify-css'); // 压缩css
var rename       = require('gulp-rename'); // 更名
var browserSync  = require('browser-sync').create(); // 浏览器自动刷新
var reload       = browserSync.reload;
var rev          = require('gulp-rev'); // 生成版本号
var revCollector = require('gulp-rev-collector'); // 替换版本号文件
var uglify       = require('gulp-uglify'); // 压缩js
var wrap         = require('gulp-wrap'); // 公共头部引用
var gulpif       = require('gulp-if');
var runSequence  = require('gulp-run-sequence'); // 按序执行gulp任务



// 各种文件路径
//var htmlSrc     = 'src/pages/*.html';
var htmlDest    = 'dist/*.html';
var cssSrc      = 'src/sass/*.scss';
var cssDest     = 'dist/css';
//var cssRevSrc   = 'src/sass/revCss';
//var jsSrc       = 'src/js/*.js';
//var jsDest      = 'dist/app/js';
//var fontSrc     = 'src/fonts/*';
//var fontDest    = 'dist/app/fonts';
//var imgSrc      = ['src/img/*/*.{png,jpg,gif,ico}','src/img/*.{png,jpg,gif,ico}'];
//var imgDest     = 'dist/app/img';
//var condition   = true; // 开发和线上环境切换

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch([cssSrc], ['sass']);
    gulp.watch(htmlDest).on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src(cssSrc)
        .pipe(sass())
        .pipe(gulp.dest(cssDest))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);

// 浏览器自动刷新
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

// fonts & img 根据MD5获取版本号
gulp.task('revFont', function(){
    return gulp.src(fontSrc)
        .pipe(rev())
        .pipe(gulp.dest(fontDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/font'));
});

gulp.task('revImg', function(){
    return gulp.src(imgSrc)
        .pipe(rev())
        .pipe(gulp.dest(imgDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/img'));
});



// 压缩JS/生成版本号
gulp.task('miniJs', function(){
    return gulp.src(jsSrc)
        .pipe(gulpif(
            condition, uglify()
        ))
        .pipe(gulpif(
            condition, rename({
                suffix: '.min'
            })
        ))
        .pipe(rev())
        .pipe(gulp.dest(jsDest))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'))
        .pipe(browserSync.stream());

});


// CSS里更新引入文件(图片、字体等)版本号,将文件暂存于cssRevSrc内
gulp.task('revCollectorCss', function () {
    return gulp.src(['dist/rev/**/*.json', cssSrc])
        .pipe(revCollector())
        .pipe(gulp.dest(cssRevSrc));
});


// 编译scss文件，添加浏览器前缀，压缩css，生成版本号
gulp.task('miniCss', function(){
    return gulp.src('src/sass/*.scss')
        .pipe(sass())
        /*.pipe(gulpif(
            condition, minifyCss({
                compatibility: 'ie7'
            })
        ))*/
        //.pipe(rev())
        /*.pipe(gulpif(
            condition, changed(cssDest)
        ))*/
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false,
            remove: false
        }))
        /*.pipe(gulpif(
            condition, rename({
                suffix: '.min'
            })
        ))*/
        .pipe(gulp.dest(cssDest))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('dist/rev/css'));
});



// 压缩Html/更新引入文件版本
gulp.task('miniHtml', function () {
    return gulp.src(['dist/rev/**/*.json', htmlSrc])
        .pipe(revCollector())
          .pipe(gulpif(
         condition, minifyHtml({
         empty: true,
         spare: true,
         quotes: true
         })
         )) // 压缩html的选项
        .pipe(gulp.dest(htmlDest))
        .pipe(browserSync.stream());
});


// 监测文件变化
/*gulp.task('watch', function () {
    gulp.watch([cssSrc, jsSrc, htmlSrc], ['dev']);
});*/

gulp.task('watch', function () {
 gulp.watch([cssSrc], ['miniCss']);
 });


// 开发构建
gulp.task('dev', function (done) {
    condition = false;
    runSequence(
        ['revFont', 'revImg'],
        ['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml'],
        done);
});

// 正式构建
/*gulp.task('build', function (done) {
    runSequence(
        ['revFont', 'revImg'],
        ['revCollectorCss'],
        ['miniCss', 'miniJs'],
        ['miniHtml'],
        done);
});*/


//gulp.task('default', ['browser-sync', 'dev', 'watch' ]);

//gulp.task('default', ['miniCss', 'watch' ]);