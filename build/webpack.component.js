const path = require("path");

const fs = require("fs");

const { merge } = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = require("./webpack.build.base");

const packageJson = require("../package.json");

const dependencies = {};

for (const key in packageJson.dependencies) {
  dependencies[key] = {
    root: key,
    commonjs: key,
    commonjs2: key,
    amd: key,
  };
}

const resolve = (dir) => path.resolve(__dirname, "../src", dir);

const utilsList = fs.readdirSync(resolve("utils"));
const mixinsList = fs.readdirSync(resolve("mixins"));
const jsList = fs.readdirSync(resolve("js"));
const imageList = fs.readdirSync(resolve("images"));

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

const getExternalsList = () => {
  const externals = {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
    ...dependencies,
    "src/locale/index.js": "lin-view-ui/lib/assets/locale/index.js",
    "src/locale/lang/zh-CN.js": "lin-view-ui/lib/assets/locale/lang/zh-CN.js",
    "src/locale/lang/en-US.js": "lin-view-ui/lib/assets/locale/lang/en-US.js",
    "src/locale/format.js": "lin-view-ui/lib/assets/locale/format.js",
    "src/fonts/iconfont.css": "lin-view-ui/src/fonts/iconfont.css",
    "flv.js/dist/flv.js": "flv.js/dist/flv.js",
  };

  utilsList.forEach(function(file) {
    file = path.basename(file);
    externals[`src/utils/${file}`] = `lin-view-ui/lib/assets/utils/${file}`;
  });
  mixinsList.forEach(function(file) {
    file = path.basename(file);
    externals[`src/mixins/${file}`] = `lin-view-ui/lib/assets/mixins/${file}`;
  });
  jsList.forEach(function(file) {
    file = path.basename(file);
    externals[`src/js/${file}`] = `lin-view-ui/lib/assets/js/${file}`;
  });
  imageList.forEach(function(file) {
    file = path.basename(file);
    externals[`src/images/${file}`] = `lin-view-ui/src/images/${file}`;
  });
  return externals;
};

const output = path.resolve(__dirname, "../lib");
const entry = getComponentEntries("packages");

const componentConfig = {
  entry,
  output: {
    path: output,
    filename: "[name]/index.js",
    libraryTarget: "umd",
    libraryExport: "commonjs2",
    library: "[name]",
  },
  externals: {
    ...getExternalsList(),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/style.css",
    }),
  ],
};

module.exports = merge(baseConfig, componentConfig);
