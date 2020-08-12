const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./webpack.base");

const buildType = process.env.BUILD_TYPE;

let entryObj = {};

let output = {};

let cssFileName = "";

if (buildType === "index") {
  entryObj = { index: resolve("src/index.js") };
  output = {
    filename: "index.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "LinViewUi",
  };
  cssFileName = "style.css";
} else {
  entryObj = getComponentEntries("packages");
  output = {
    filename: "[name]/index.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "[name]",
  };
  cssFileName = "[name]/style.css";
}

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    entry: entryObj,
    output: output,
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
      filename: cssFileName,
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
