const { src, dest } = require("gulp");

const sass = require("gulp-sass");

const cssmin = require("gulp-clean-css");

const autoprefixer = require("gulp-autoprefixer");

const { resolveRoot } = require("./utils.js");

const copyFont = async () => {
  await src(resolveRoot("./src/theme-chalk/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./lib/theme-chalk/fonts")));
  console.log("fonts", "done");
};

const buildScss = async () => {
  await src(resolveRoot(`./src/theme-chalk/*.scss`))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./lib/theme-chalk")));
  console.log("css", "done");
};

const build = () => {
  buildScss();
  copyFont();
};

build();
