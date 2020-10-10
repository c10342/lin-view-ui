const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

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
    root: "_",
    commonjs: "flv.js",
    commonjs2: "flv.js",
    amd: "flv.js",
  },
  lodash: {
    root: "flvjs",
    commonjs: "lodash",
    commonjs2: "lodash",
    amd: "lodash",
  },
  ...baseConfig.externals,
};

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
    baseConfig.handleJs(config);
  },
};
