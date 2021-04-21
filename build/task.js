const { src, dest } = require('gulp');

const sass = require('gulp-sass');

const cssmin = require('gulp-clean-css');

const rename = require('gulp-rename');

const gulpStylelint = require('gulp-stylelint');

const path = require('path');

const replace = require('gulp-replace');

const autoprefixer = require('gulp-autoprefixer');

const packagesPath = path.resolve(__dirname, '../packages');

const distPath = path.resolve(__dirname, '../lib');

const buildScss = (srcPath, distPath) => () =>
  src(srcPath)
    .pipe(replace('src/styles', '../../../src/styles'))
    .pipe(
      gulpStylelint({
        reporters: [{ formatter: 'string', console: true }]
      })
    )
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(
      rename((srcPath) => {
        srcPath.dirname = srcPath.dirname.replace('src', '');
        srcPath.extname = '.css';
      })
    )
    .pipe(dest(distPath));

module.exports = {
  build: buildScss(`${packagesPath}/**/*.scss`, distPath)
};
