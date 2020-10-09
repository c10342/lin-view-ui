const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

// const entryObj = getComponentEntries('src/locale/lang')
// let entry = {}
// for (let key in entryObj) {
//   entry[key.replace('-','')] = entryObj[key]
// }

const entry = {
  "locale/lang/en-US": resolve("src/locale/lang/en-US.js"),
  "locale/lang/zh-CN": resolve("src/locale/lang/zh-CN.js"),
  "locale/format": resolve("src/locale/format.js"),
  "locale/index": resolve("src/locale/index.js"),
  "mixins/locale": resolve("src/mixins/locale.js"),
  "mixins/documentClick": resolve("src/mixins/documentClick.js"),
  "mixins/validate": resolve("src/mixins/validate.js"),
};

// const fs = require("fs");
// const path = require("path");
// const utilsList = fs.readdirSync(resolve("src/utils"));
// const mixinsList = fs.readdirSync(resolve("src/mixins"));
// const jsList = fs.readdirSync(resolve("src/js"));

// const externals = {
//   "src/locale": "lin-view-ui/lib/assets/locale",
// };

// utilsList.forEach(function(file) {
//   file = path.basename(file);
//   externals[`src/utils/${file}`] = `lin-view-ui/lib/assets/utils/${file}`;
// });
// mixinsList.forEach(function(file) {
//   file = path.basename(file);
//   externals[`src/mixins/${file}`] = `lin-view-ui/lib/assets/mixins/${file}`;
// });
// jsList.forEach(function(file) {
//   file = path.basename(file);
//   externals[`src/js/${file}`] = `lin-view-ui/lib/assets/js/${file}`;
// });

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    mode: "production",
    entry: entry,
    output: {
      filename: "assets/[name].js",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "[name]",
    },
    resolve: baseConfig.resolve,
    // externals,
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);
  },
};
