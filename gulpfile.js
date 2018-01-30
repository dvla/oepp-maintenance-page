var paths = {
    sourceDirectory: './src',
    targetDirectory: './dist',
    temporaryDirectory: '/tmp/maintenance-page'
};

var resources = {
    sourceFiles: paths.sourceDirectory + '/**',
    temporaryFiles: paths.temporaryDirectory + '/**',
    handlebars: {
        files: paths.sourceDirectory + '/**/*.handlebars'
    },
    scss: {
        files: paths.sourceDirectory + '/**/*.scss'
    }
};

// ==== PLUGINS ====

var gulp = require('gulp');
var debug = require('gulp-debug');

var handlebars = require('gulp-compile-handlebars');
var sass = require('gulp-sass');

var zip = require("gulp-zip");
var rename = require("gulp-rename");
var remove = require('del');

var browserSync = require('browser-sync').create();

// ==== MAIN TASKS ====

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['copy-template-assets', 'compile-handlebars', 'compile-scss', 'copy-robots-config'], function () {
    browserSync.init({
        server: {
            baseDir: paths.temporaryDirectory
        },
        open: false
    });

    gulp.watch(paths.sourceDirectory + '/govuk/template/assets/**', ['copy-template-assets', browserSync.reload]);
    gulp.watch(resources.handlebars.files, ['compile-handlebars', browserSync.reload]);
    gulp.watch(resources.scss.files, ['compile-scss', browserSync.reload]);
    gulp.watch(paths.sourceDirectory + '/robots.txt', ['copy-robots-config', browserSync.reload]);
});

gulp.task('build', ['clean', 'copy-template-assets', 'compile-handlebars', 'compile-scss', 'copy-robots-config'], function () {
    gulp.src(resources.temporaryFiles)
        .pipe(zip('maintenance-page.zip'))
        .pipe(gulp.dest(paths.targetDirectory));
});

// ==== SUB-TASKS ====

gulp.task('clean', function () {
    remove([paths.temporaryDirectory + '/**', paths.targetDirectory + '/**'], {force: true});
});

gulp.task('copy-template-assets', function () {
    return gulp.src(paths.sourceDirectory + '/govuk/template/assets/**')
        .pipe(gulp.dest(paths.temporaryDirectory + '/assets'));
});

gulp.task('compile-handlebars', function () {
    var options = {
        batch: [paths.sourceDirectory]
    };
    return gulp.src(paths.sourceDirectory + '/govuk/template/template.handlebars')
        .pipe(handlebars({}, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.temporaryDirectory));
});

gulp.task('compile-scss', function () {
    var options = {
        includePaths: paths.sourceDirectory + '/govuk/toolkit/assets/stylesheets'
    };
    return gulp.src(paths.sourceDirectory + '/govuk/elements/**/*.scss')
        .pipe(sass(options).on('error', sass.logError))
        .pipe(gulp.dest(paths.temporaryDirectory));
});

gulp.task('copy-robots-config', function () {
    return gulp.src(paths.sourceDirectory + '/robots.txt')
        .pipe(gulp.dest(paths.temporaryDirectory));
});
