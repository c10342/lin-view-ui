const { src, dest } = require("gulp");

const sass = require("gulp-sass");

const cssmin = require("gulp-clean-css");

const rename = require("gulp-rename");

const autoprefixer = require("gulp-autoprefixer");

const path = require("path");

const del = require("del");

const root = path.resolve(__dirname, "../packages/theme-chalk");

const buildScss = (srcPath, distPath) => {
  return src(srcPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(
      rename((srcPath) => {
        srcPath.basename = 'style'
        srcPath.extname = ".css";
      })
    )
    .pipe(dest(distPath));
};

function copyfont(distPath) {
  return src(path.resolve(root, "./src/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(distPath));
}

const clean = (cleanPath) => {
  return del(cleanPath, {
    force: true,
  });
};
module.exports = {
  buildScss,
  copyfont,
  clean,
};
