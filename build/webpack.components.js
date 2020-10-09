const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");
const fs = require("fs");
const path = require("path");
const utilsList = fs.readdirSync(resolve("src/utils"));
const mixinsList = fs.readdirSync(resolve("src/mixins"));
const jsList = fs.readdirSync(resolve("src/js"));

const externals = {
  vue: {
    root: "Vue",
    commonjs: "vue",
    commonjs2: "vue",
    amd: "vue",
  },
  "hls.js": {
    root: "Hls",
    commonjs: "hls.js",
    commonjs2: "hls.js",
    amd: "hls.js",
  },
  "flv.js": {
    root: "flvjs",
    commonjs: "flv.js",
    commonjs2: "flv.js",
    amd: "flv.js",
  },
  "src/locale": "lin-view-ui/lib/assets/locale",
};

utilsList.forEach(function(file) {
  file = path.basename(file);
  externals[`src/utils/${file}`] = `lin-view-ui/lib/assets/utils/${file}`;
});
mixinsList.forEach(function(file) {
  file = path.basename(file);
  externals[`src/mixins/${file}`] = `lin-view-ui/lib/assets/mixins/${file}`;
});
jsList.forEach(function(file) {
  file = path.basename(file);
  externals[`src/js/${file}`] = `lin-view-ui/lib/assets/js/${file}`;
});

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    mode: "production",
    entry: getComponentEntries("packages"),
    output: {
      filename: "[name]/index.js",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "[name]",
    },
    resolve: baseConfig.resolve,
    externals: externals,
  },
  css: {
    sourceMap: false,
    extract: {
      filename: "[name]/style.css",
    },
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);

    // config.module
    //   .rule("fonts")
    //   .use("url-loader")
    //   .tap((option) => {
    //     option.fallback.options.name = "assets/fonts/[name].[hash:8].[ext]";
    //     return option;
    //   });
    baseConfig.handleJs(config);
  },
};
