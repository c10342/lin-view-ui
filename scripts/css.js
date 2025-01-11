const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass-embedded"));
const cssmin = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");
const del = require("del");

const buildScss = async () => {
  const distPath = path.resolve(__dirname, "../dist/theme-chalk");
  // 先删除旧的文件
  await del(distPath, { force: true });
  src(path.resolve(__dirname, "../packages/theme-chalk/**/*.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest(distPath))
    .on("end", () => {
      console.log("css done");
    });
};

buildScss();
