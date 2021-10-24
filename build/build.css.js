const fs = require("fs");

const { src, dest } = require("gulp");

const sass = require("gulp-sass");

const cssmin = require("gulp-clean-css");

const rename = require("gulp-rename");

const autoprefixer = require("gulp-autoprefixer");

const { resolveRoot } = require("./utils.js");

const path = require("path");

const styleRoot = resolveRoot("./src/theme-chalk");

const copyFont = async () => {
  await src(resolveRoot("./src/theme-chalk/fonts") + "/**")
    .pipe(cssmin())
    .pipe(dest(resolveRoot("./lib/theme-chalk/fonts")));
  console.log("fonts", "done");
};

const buildScss = async name => {
  await src(resolveRoot(`./src/theme-chalk/${name}`))
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(
      rename(srcPath => {
        const basename = name.split(".")[0];
        srcPath.basename = basename;
        srcPath.extname = ".css";
      })
    )
    .pipe(dest(resolveRoot("./lib/theme-chalk")));
  console.log(name, "done");
};

const build = () => {
  const externalFile = ["iconfont.css", "_var.scss"];
  const styleList = fs
    .readdirSync(styleRoot)
    .filter(fileName => fs.statSync(path.resolve(styleRoot, fileName)).isFile())
    .filter(fileName => !externalFile.includes(fileName));

  styleList.forEach(fileName => buildScss(fileName));
  copyFont();
};

build();
