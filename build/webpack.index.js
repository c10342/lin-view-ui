const { resolve } = require("./utils");
const baseConfig = require("./webpack.base");

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    mode: "production",
    entry: { index: resolve("src/index.js") },
    output: {
      filename: "index.js",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "LinViewUi",
    },
    resolve: baseConfig.resolve,
    externals: {
      vue: {
        root: "Vue",
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
      },
    },
  },
  css: {
    sourceMap: false,
    extract: {
      filename: "style.css",
    },
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);

    config.module
      .rule("fonts")
      .use("url-loader")
      .tap((option) => {
        option.fallback.options.name = "assets/fonts/[name].[hash:8].[ext]";
        return option;
      });
    baseConfig.handleJs(config);
  },
};
