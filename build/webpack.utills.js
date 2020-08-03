const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

module.exports = {
  productionSourceMap: true,
  outputDir: resolve("utils"),
  configureWebpack: {
    mode: "production",
    entry: {
      ...getComponentEntries("packages/assets/utils"),
    },
    output: {
      filename: "[name].js",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "lin-utils",
    },
    resolve: baseConfig.resolve,
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);

    baseConfig.handleJs(config);
  },
};
