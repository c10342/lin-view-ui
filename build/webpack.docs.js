const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");


const output = path.resolve(__dirname, "../docs-dist");
let entry = path.resolve(__dirname, "../docs/main.js");

const isDev = process.env.NODE_ENV === "development";

const target = process.env.target;

if (target) {
  entry = path.resolve(__dirname, `../${target}/main.js`);
}

const devConfig = {
  mode: isDev ? "development" : "production",
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
  resolve: {
    extensions: [".js", ".jsx", "md", ".vue", ".json"],
    alias: {
      "@lin-view-ui": path.join(__dirname, "../packages"),
    },
  },
  entry,
  output: {
    path: output,
    filename: isDev ? "js/[name].js" : "js/[name].[hash].js",
  },
  devtool: isDev ? "cheap-module-eval-source-map" : false,
  devServer: {
    open: true,
    overlay: true, // 错误直接显示在浏览器中
    contentBase: output,
    hot: true,
    historyApiFallback: true,
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
      {
        test: /\.md$/,
        use: [
          {
            loader: "vue-loader",
          },
          {
            loader: path.resolve(__dirname, "./md-loader/index.js"),
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "images/",
            limit: 10240,
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../docs/public/index.html"),
      filename: "index.html",
      favicon: path.resolve(__dirname, "../docs/public/favicon.ico"),
    }),
    new VueLoaderPlugin()
  ],
};

if (!isDev) {
  devConfig.plugins.push(new CleanWebpackPlugin());
  devConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].chunk.css",
    })
  );
}

module.exports = devConfig;
