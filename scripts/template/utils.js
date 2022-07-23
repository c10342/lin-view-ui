const path = require("path");

const fs = require("fs");

const { resolveRoot, resolvePackages, resolve } = require("../helper.js");

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

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) return true;
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}

module.exports = {
  toHump,
  resolvePackages,
  mkdirsSync,
  resolve,
  resolveRoot
};
