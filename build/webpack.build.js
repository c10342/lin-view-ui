const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

const entryObj = getComponentEntries("packages");

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    entry: {
      ...entryObj,
      index: resolve("src/index.js"),
    },
    output: {
      filename: "[name]/index.js",
      // libraryTarget: "commonjs2",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "lin-view-ui",
    },
    resolve: baseConfig.resolve,
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: "vue-markdown-loader",
            },
          ],
        },
      ],
    },
  },
  css: {
    sourceMap: false,
    extract: {
      filename: "[name]/style.css",
    },
  },
  chainWebpack: (config) => {
    baseConfig.handleBuild(config);

    config.module
      .rule("fonts")
      .use("url-loader")
      .tap((option) => {
        option.fallback.options.name = "static/fonts/[name].[hash:8].[ext]";
        return option;
      });
    baseConfig.handleJs(config);
  },
};
