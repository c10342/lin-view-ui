const { resolve } = require("./utils");
const baseConfig = require("./webpack.base");

module.exports = {
  pages: {
    docs: {
      // page 的入口
      entry: "docs/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "组件文档",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "docs"],
    },
  },
  productionSourceMap: false,
  outputDir: resolve("docs-dist"),
  devServer: {
    open: true,
  },
  configureWebpack: {
    resolve: baseConfig.resolve,
  },
  css: {
    sourceMap: false,
    extract: {
      filename: "css/style.css",
    },
  },
  chainWebpack: (config) => {
    baseConfig.handleJs(config);

    baseConfig.handleMD(config);
  },
};
