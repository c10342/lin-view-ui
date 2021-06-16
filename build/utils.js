const path = require("path");

const root = path.resolve(__dirname, "../packages");

function getExternalsDep(name) {
  const dir = path.resolve(root, name);
  const pck = require(path.resolve(dir, "./package.json"));

  const dependencies = pck.dependencies || {};
  const peerDependencies = pck.peerDependencies || {}

  const externals =[];

  Object.keys(dependencies).forEach(key=>externals.push(key))
  Object.keys(peerDependencies).forEach(key=>externals.push(key))

  return [...new Set(externals)];
}

module.exports = {
  getExternalsDep
}
