const devConfig = require("./build/webpack.dev");
const proConfig = require("./build/webpack.build");
const docsConfig = require("./build/webpack.docs");
const env = process.env.NODE_ENV;

let config;

if (env === "development") {
  config = devConfig;
} else if (env === "docs") {
  config = docsConfig;
} else {
  config = proConfig;
}

module.exports = config;
