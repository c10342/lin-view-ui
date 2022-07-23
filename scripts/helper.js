const path = require("path");

const resolve = (...args) => {
  return path.resolve(...args);
};

const resolveRoot = (...args) => {
  return resolve(__dirname, "../", ...args);
};

const resolvePackages = (...args) => {
  return resolveRoot("./packages", ...args);
};

const resolveDocs = (...args) => {
  return resolveRoot("./docs", ...args);
};

module.exports = {
  resolve,
  resolveRoot,
  resolvePackages,
  resolveDocs
};
