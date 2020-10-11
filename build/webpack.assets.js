const path = require("path");
const baseConfig = require("./webpack.base");

const fs = require("fs");

const resolve = (dir) => path.resolve(__dirname, "../src", dir);

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

const configList = [];
for (const key in entry) {
  if (entry.hasOwnProperty(key)) {
    const item = entry[key];
    let library = path.basename(item, ".js");
    if (key === "utils/index.js") {
      library = "LinUtils";
    } else if (key === "locale/index.js") {
      library = "LinLocale";
    } else if (key.startsWith("locale/lang")) {
      library = library.replace("-", "");
    }
    configList.push(createConfig(item, key, library));
  }
}

function createConfig(entry, filename, library) {
  return {
    mode: "production",
    entry: entry,
    output: {
      path: path.resolve(__dirname, "../lib"),
      filename: `assets/${filename}`,
      libraryTarget: "umd",
      libraryExport: "default",
      library: library,
    },
    resolve: baseConfig.resolve,
    externals: baseConfig.externals,
    optimization: {
      splitChunks: {},
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: {
                      chrome: "58",
                      ie: "9",
                    },
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                    version: "7.0.0-beta.0",
                  },
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
}

module.exports = configList;
