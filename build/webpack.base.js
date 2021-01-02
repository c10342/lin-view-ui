const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
const baseConfig = {
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  resolve: {
    extensions: [".js", ".jsx", "md", ".vue", ".json"],
    alias: {
      packages: path.join(__dirname, "../packages"),
      "lin-view-ui": path.join(__dirname, "../src/index.js"),
      src: path.join(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};

module.exports = baseConfig;
