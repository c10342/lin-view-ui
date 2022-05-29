const path = require("path");

function resolve(...args) {
  return path.resolve(...args);
}

function resolveRoot(...args) {
  return resolve(__dirname, "../", ...args);
}

function resolvePackages(...args) {
  return resolveRoot("./packages", ...args);
}

function resolveDocs(...args) {
  return resolveRoot("./docs", ...args);
}

module.exports = {
  resolve,
  resolveRoot,
  resolvePackages,
  resolveDocs
};
