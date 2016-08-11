var elixir = require('laravel-elixir');
var gulp = require('gulp');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');
var sass = require('gulp-sass');


gulp.task('webpack', function(){

    
    return gulp.src('resources/assets/js/app.js')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function(){
    return gulp.src('resources/assets/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('watch', function(){
    gulp.watch('resources/assets/js/**/*.js', ['webpack']);
    gulp.watch('resources/assets/sass/**/*.scss', ['styles']);
});


gulp.task('default', ['watch']);
gulp.task('build', ['webpack', 'styles']);
