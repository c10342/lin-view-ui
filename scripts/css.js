/* eslint-disable @typescript-eslint/no-require-imports */
const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass-embedded"));
const cssmin = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const path = require("path");

const buildScss = async () => {
  const distPath = path.resolve(__dirname, "../dist/theme-chalk");
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
