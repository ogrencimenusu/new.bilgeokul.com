const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const runSequence = require('run-sequence');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});
gulp.task('css', () => {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/assets/my/'))
        .pipe(browserSync.stream());
});
gulp.task('js', () => {
    return gulp.src('src/js/main.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/my/'))
        .pipe(browserSync.stream());
});
gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('delete', () => del([
    'dist/assets/my/**/*.css',
    'dist/assets/my/main.js',
    'dist/**/*.html'
]));

gulp.task('watch', () => {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/main.js", ['js']);
    gulp.watch("src/**/*.html", ['html']);
});

gulp.task('default', () => {
    runSequence(
        'delete',
        'html',
        'css',
        'js',
        'browser-sync',
        'watch'
    );
});
