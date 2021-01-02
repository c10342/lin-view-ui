const path = require("path");

const fs = require("fs");

const { merge } = require("webpack-merge");

const resolve = (dir) => path.resolve(__dirname, "../src", dir);

const baseConfig = require("./webpack.base");

const getAssetsEntries = (pathStr) => {
  let files = fs.readdirSync(resolve(pathStr));
  const assetsEntries = files.reduce((ret, item) => {
    const itemPath = path.join(pathStr, item);
    const myPath = resolve(`${itemPath}`);
    const stat = fs.lstatSync(myPath);
    if (stat.isFile()) {
      ret[`${pathStr}/${item}`] = myPath;
    } else {
      const result = getAssetsEntries(`${pathStr}/${item}`);
      ret = {
        ...ret,
        ...result,
      };
    }
    return ret;
  }, {});
  return assetsEntries;
};

const entry = {
  ...getAssetsEntries("js"),
  ...getAssetsEntries("locale"),
  ...getAssetsEntries("mixins"),
  ...getAssetsEntries("utils"),
};

const assetsConfig = {
  mode: "production",
  entry: entry,
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename: `assets/[name]`,
    libraryTarget: "commonjs2",
    libraryExport: "default",
    library: "[name]",
  },
};

module.exports = merge(baseConfig, assetsConfig);
