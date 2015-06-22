var gulp = require('gulp'),
    connect = require('gulp-connect'),
    opn = require('opn'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber');

var onError = function(error) {
    console.log(error);
};

// Server

gulp.task('connect', function() {
    connect.server({
        root: 'app/',
        livereload: true,
        port: 8080
    })
});


gulp.task('open', function() {
    opn('http://localhost:8080')
});



// Watchers

gulp.task('html', function() {
    gulp.src('app/*.html')
        .pipe(connect.reload());
});


gulp.task('js', function() {
    gulp.src('app/js/*.js')
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch(['app/*.html'], ['html']);
    gulp.watch(['app/js/*.js'], ['js']);
    gulp.watch(['app/less/**/*.less'], ['less']);
});



// Builds

gulp.task('less', function() {
    gulp.src('app/less/styles.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less())
        .pipe(gulp.dest('./app/css'))
        .pipe(connect.reload());
});


// Main Tasks

gulp.task('default', ['connect', 'less', 'watch', 'open'])