const   { src, dest, watch, series, task } = require('gulp'),
        sass = require('gulp-sass')(require('sass')),
        rename = require('gulp-rename'),
        noop = require('gulp-noop'),
        file = require('gulp-file'),
        webpack = require('webpack-stream'),
        compiler = require('webpack'),
        { spawn } = require('child_process'),
        { platform } = require('os'),
        path = require('path'),
        browserSync = require('browser-sync').create();

// Compile SASS into working CSS
task(function buildSass() {
    return src('src/sass/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(dest('story/modules'))
})

// Bundle JS into story dir
task(function bundle() {
    return src('src/js/index.js')
        .pipe(webpack(require('./webpack.config.js'),compiler,function(err, stats){}))
        .pipe(rename('story.bundle.js'))
        .pipe(dest('story/modules'))
})

// Configure Environments
task(function configDev() {
    let config = '{"history": {"controls": true, "maxStates": 2  }, "debug": false, "logging": true }'
    return writeConfig(config)
})

task(function configProd() {
    let config = '{"history": {"controls": true, "maxStates": 2  }, "debug": false, "logging": true }'
    return writeConfig(config)
})

function writeConfig(config) {
    return src('src/**.js')
        .pipe(file('config.json', config))
        .pipe(dest('src/js'))
}

function serve(cb) {
    browserSync.init({
        server: "./dist",
        port: 8080,
        host: "localhost"
    }, cb)
}

function reload(cb) {
    browserSync.reload()
    cb()
}

// Watch Tasks
task(function watching() {
    watch('src/js', task('bundle'))
    watch('src/sass', task('buildSass'))
})

task('build', series('bundle','buildSass','buildTwee'))

task('watchDev', series('bundle','buildSass', 'buildTwee', serve, 'watching'))
task('default', task('watchDev'))