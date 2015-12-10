// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('usds', function() {
    return gulp.src('usds/*.css')
        .pipe(gulp.dest('dist/css/usds'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    return gulp.src('html/**')
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function() {
    return gulp.src('img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('angular', function() {
    return gulp.src('node_modules/angular/*')
        .pipe(gulp.dest('dist/lib/angular'));
});

gulp.task('bootstrap', function() {
    return gulp.src('node_modules/bootstrap/dist/**')
        .pipe(gulp.dest('dist/lib/bootstrap'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('img/*', ['img']);
    gulp.watch('html/*.html', ['html']);

});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'html', 'img', 'angular', 'bootstrap', 'watch']);