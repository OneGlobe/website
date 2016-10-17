// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var nunjucksRender = require('gulp-nunjucks-render');
var browserSync = require('browser-sync').create();
var rimraf = require('rimraf');

//Delete dist directory
gulp.task('clean', function (cb) {
  rimraf('./dist', cb);
});

// Lint Task
gulp.task('lint', ['clean'], function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', ['clean'], function() {
    return gulp.src('scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('minify-css', ['sass'], function() {
    return gulp.src('dist/css/*.css')
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['clean'], function() {
    return gulp.src('js/**/*.js')
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
        //.pipe(rename('all.min.js'))
        //.pipe(uglify())
        //.pipe(gulp.dest('dist/js'));
});

gulp.task('html', ['clean'], function() {
    return gulp.src('html/**')
        .pipe(gulp.dest('dist'));
});

gulp.task('img', ['clean'], function() {
    return gulp.src('img/**')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('nunjucks', ['clean'], function() {
    // Gets .html and .njk files in pages
    return gulp.src('html/pages/**/*.+(html|njk)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['html/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    browserSync.init({
        server: "./dist"
    });

    // recompile all the things when they change
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch('img/*', ['img']);
    gulp.watch('html/**/*.html', ['nunjucks']);
    gulp.watch('html/**/*.njk', ['nunjucks']);

    // reload the browser when anything is recompiled
    gulp.watch('dist/*').on('change', browserSync.reload);

});


//gulp.task('build', ['lint', 'sass', 'minify-css', 'scripts', 'html', 'img', 'angular', 'bootstrap']);
gulp.task('build', ['clean', 'img', 'sass', 'minify-css', 'lint', 'scripts', 'nunjucks']);
gulp.task('default', ['build', 'watch']);
