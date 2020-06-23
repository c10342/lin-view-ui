const { resolve, getComponentEntries } = require("./utils");
const baseConfig = require("./config.base");

module.exports = {
  productionSourceMap: false,
  outputDir: resolve("lib"),
  configureWebpack: {
    entry: {
      ...getComponentEntries("packages"),
    },
    output: {
      filename: "[name]/index.js",
      // libraryTarget: "commonjs2",
      libraryTarget: "umd",
      libraryExport: "default",
      library: "lin-vue-ui",
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
    config.optimization.delete("splitChunks");
    config.plugins.delete("copy");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("html");
    config.plugins.delete("hmr");
    config.entryPoints.delete("app");

    config.module
      .rule("fonts")
      .use("url-loader")
      .tap((option) => {
        option.fallback.options.name = "static/fonts/[name].[hash:8].[ext]";
        return option;
      });

    config.module
      .rule("js")
      .include.add(resolve("packages"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        return options;
      });
  },
};

// 这里面主要讲chainWebpack中做了什么事情：
// 删除splitChunks，在打包组件的时候，并不希望抽离每个组件的公共js出来，而是每个独立打包，于是删除这个配置；
// 删除copy：不要复制public文件到打包目录；
// 删除preload以及prefetch，因为删除了html插件，所以这两个也没用；
// 删除html，只打包组件，不生成html页面；
// 删除hmr，删除hot-module-reload；
// 删除自动加上的入口：app
// 下面的配置fonts这个rule，打包字体的时候，输出到打包目录的static/fonts目录下；
