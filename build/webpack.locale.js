const { resolve,getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");


const entryObj = getComponentEntries('src/locale/lang')
let entry = {}
for (let key in entryObj) {
  entry[key.replace('-','')] = entryObj[key]
}


module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    entry: entry,
    output: {
      filename: "assets/locale/[name].js",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "[name]",
    },
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);
  },
}
