const { src, dest } = require("gulp");

const sass = require("gulp-sass")(require("sass"));

const cssmin = require("gulp-clean-css");

const autoprefixer = require("gulp-autoprefixer");

const { resolveRoot } = require("./utils.js");

async function copyFont() {
  await src(resolveRoot("./src/theme-chalk/src/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./lib/theme-chalk/fonts")));
  console.log("fonts", "done");
}

async function buildScss() {
  await src([
    resolveRoot(`./src/theme-chalk/src/*.scss`),
    resolveRoot(`./src/theme-chalk/index.scss`),
  ])
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./lib/theme-chalk")));
  console.log("css", "done");
}

const build = () => {
  buildScss();
  copyFont();
};

build();
