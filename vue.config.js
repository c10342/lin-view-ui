const devConfig = require("./build/webpack.dev");
const docsConfig = require("./build/webpack.docs");
const indexConfig = require("./build/webpack.index");
const componentsConfig = require("./build/webpack.components");
const env = process.env.NODE_ENV;

let config = devConfig;

if (env === "development") {
  config = devConfig;
} else if (env === "docs") {
  config = docsConfig;
} else if (env === "index") {
  config = indexConfig;
} else if (env === "components") {
  config = componentsConfig;
}

module.exports = config;
