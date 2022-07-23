const fs = require("fs");

const rollup = require("rollup");

const { resolvePackages } = require("../helper");

const pck = require("../../package.json");

const dependencies = pck.dependencies || {};

const excludeComponents = ["theme-chalk"];

const packagesReg = /^@packages\//;

const langReg = /^@lang\//;

const components = fs
  .readdirSync(resolvePackages())
  .filter((name) => !excludeComponents.includes(name));

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

const rollupBuild = async (inputOptions, outputOptions) => {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
};

module.exports = {
  components,
  external,
  paths,
  getOutputName,
  rollupBuild
};
