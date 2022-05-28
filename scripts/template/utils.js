const path = require("path");

const fs = require("fs");

function toHump(name) {
  const reg = /-(\w)/g;
  if (name.match(reg)) {
    name = name.replace(reg, function (all, letter) {
      return letter.toUpperCase();
    });
  }
  name = name.replace(/^(\w)/, function (all, letter) {
    return letter.toUpperCase();
  });
  return name;
}

function resolveRoot(...args) {
  return path.resolve(__dirname, "../../", ...args);
}

function resolvePackages(...args) {
  return resolveRoot("./packages", ...args);
}

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) return true;
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

function resolve(...args) {
  return path.resolve(...args);
}

module.exports = {
  toHump,
  resolvePackages,
  mkdirsSync,
  resolve
};
