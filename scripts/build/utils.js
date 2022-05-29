const fs = require("fs");

const { resolveRoot, resolvePackages } = require("../utils.js");

const pck = require("../../package.json");

const dependencies = pck.dependencies || {};

const excludeComponents = ["theme-chalk"];

const components = fs
  .readdirSync(resolvePackages())
  .filter((name) => !excludeComponents.includes(name));

const packagesReg = /^@packages\//;

const langReg = /^@lang\//;

const external = (id) => {
  if (id.match(/^vue$/) || id in dependencies) {
    return true;
  } else if (id.match(packagesReg) || id.match(langReg)) {
    return true;
  }
};

const paths = (id) => {
  if (id.match(packagesReg)) {
    const name = id.split("/")[1];
    return `./${name}.js`;
  } else if (id.match(langReg)) {
    const name = id.split("/")[1];
    return `./lang/${name}.js`;
  }
};

const getOutputName = (name) => {
  if (name === "lin-view-ui") {
    return "index";
  }
  return name;
};

module.exports = {
  resolvePackages,
  components,
  external,
  paths,
  getOutputName,
  resolveRoot
};
