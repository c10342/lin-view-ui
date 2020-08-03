const devConfig = require("./build/webpack.dev");
const proConfig = require("./build/webpack.build");
const docsConfig = require("./build/webpack.docs");
const utilsConfig = require("./build/webpack.utills");
const env = process.env.NODE_ENV;

let config;

if (env === "development") {
  config = devConfig;
} else if (env === "docs") {
  config = docsConfig;
} else if (env === "utils") {
  config = utilsConfig;
} else {
  config = proConfig;
}

module.exports = config;
