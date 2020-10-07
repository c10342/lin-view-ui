const devConfig = require("./build/webpack.dev");
const proConfig = require("./build/webpack.build");
const docsConfig = require("./build/webpack.docs");
const utilsConfig = require("./build/webpack.utills");
const localeConfig = require('./build/webpack.locale')
const env = process.env.NODE_ENV;

let config = proConfig;

if (env === "development") {
  config = devConfig;
} else if (env === "docs") {
  config = docsConfig;
} else if (env === "utils") {
  config = utilsConfig;
} else if(env === 'locale'){
  config = localeConfig
}

module.exports = config;
