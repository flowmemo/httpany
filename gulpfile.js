'use strict'
const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')

gulp.task('build', () => {
  return gulp.src('./src')
    .pipe(babel())
    .pipe(gulp.dest('./lib'))
})

gulp.task('serve', ['build'], () => {
  return nodemon({
    script: './lib/app.js',
    watch: './src',
    task: ['build']
  })
})
