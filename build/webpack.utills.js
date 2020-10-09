const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

const buildType = process.env.BUILD_TYPE;

let entryObj = {};

let output = {};

if (buildType === "index") {
  entryObj = { index: resolve("src/utils/index.js") };
  output = {
    filename: "index.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "LinUtils",
  };
} else {
  entryObj = getComponentEntries("src/utils");
  if ("index" in entryObj) {
    delete entryObj.index;
  }
  output = {
    filename: "[name].js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "[name]",
  };
}

module.exports = {
  outputDir: resolve("lib/assets/utils"),
  configureWebpack: {
    mode: "production",
    entry: entryObj,
    output: output,
    resolve: baseConfig.resolve,
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);

    baseConfig.handleJs(config);
  },
};
