const { src, dest } = require("gulp");

const sass = require("gulp-sass")(require("sass"));

const cssmin = require("gulp-clean-css");

const autoprefixer = require("gulp-autoprefixer");

const { resolveRoot, resolvePackages } = require("../helper");

const copyFont = () => {
  src(resolvePackages("./theme-chalk/src/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./dist/theme-chalk/fonts")));
  console.log("fonts", "done");
};

const buildScss = () => {
  src(resolvePackages("./theme-chalk/src/*.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./dist/theme-chalk")));
  console.log("css", "done");
};

const build = () => {
  buildScss();
  copyFont();
};

build();
