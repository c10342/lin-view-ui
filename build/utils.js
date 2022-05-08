const fs = require("fs");

const path = require("path");

const resolveRoot = (...args) => {
  return path.resolve(__dirname, "../", ...args);
};

const resolvePackages = (...args) => {
  return resolveRoot("./packages", ...args);
};

const components = fs
  .readdirSync(resolvePackages())
  .filter((name) => name !== "theme-chalk");

const external = (id) => {
  if (id.match(/^vue$/)) {
    return true;
  } else if (id.match(/^@packages\//)) {
    return true;
  }
};

const paths = (id) => {
  if (id.match(/^@packages\//)) {
    const name = id.split("/")[1];
    return `./${name}.js`;
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
