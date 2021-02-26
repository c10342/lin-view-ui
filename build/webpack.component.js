const path = require("path");

const fs = require("fs");

const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./webpack.build.base");

const util = require('./util')

const getComponentEntries = (pathStr) => {
  let files = fs.readdirSync(path.join(__dirname, "../", pathStr));
  const componentEntries = files.reduce((ret, item) => {
    const itemPath = path.join(pathStr, item);
    const [name] = item.split(".");
    ret[name] = path.join(__dirname, "../", `${itemPath}`);
    return ret;
  }, {});
  return componentEntries;
};

const output = path.resolve(__dirname, "../lib");
const entry = getComponentEntries("packages");

const componentConfig = {
  entry,
  output: {
    path: output,
    filename: "[name]/index.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "[name]",
  },
  externals: {
    ...util.getExternalsList()
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/style.css",
    }),
  ],
};

module.exports = merge(baseConfig, componentConfig);
