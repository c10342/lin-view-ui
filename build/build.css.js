const { src, dest } = require("gulp");

const sass = require("gulp-sass");

const cssmin = require("gulp-clean-css");

const rename = require("gulp-rename");

const autoprefixer = require("gulp-autoprefixer");

const path = require("path");

const root = path.resolve(__dirname, "../packages/theme-chalk");

const fs = require("fs");

const resolve = pathSrc => path.resolve(root, pathSrc);

const buildScss = (
  srcPath,
  distPath,
  options = {
    basename: "style"
  }
) => {
  return src(srcPath)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(
      rename(srcPath => {
        srcPath.basename = options.basename;
        srcPath.extname = ".css";
      })
    )
    .pipe(dest(distPath));
};

function copyfont(distPath, comp) {
  const str = fs.readFileSync(resolve(`./src/${comp}.scss`));
  if (!str.includes("./iconfont.css")) {
    return Promise.resolve();
  }
  return src(resolve("./src/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(distPath));
}

module.exports = {
  buildScss,
  copyfont
};
