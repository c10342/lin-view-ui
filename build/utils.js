const path = require("path");

const fs = require("fs");

const rollup = require("rollup");

const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const vuePlugin = require("rollup-plugin-vue");

const pck = require("../package.json");

const rootPath = path.resolve(__dirname, "../");

async function rollupBuild(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

function resolveRoot(pathSrc) {
  return path.resolve(rootPath, pathSrc);
}

function createInputOptions(options = {}) {
  const config = {
    input: options.input,
    external: options.external,
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: resolveRoot("./tsconfig.json")
      }),
      vuePlugin({target: 'browser'}),
    ],
  };
  return config;
}

function getExternalsDep() {
  const externals = ["@src/utils"];
  const dependencies = pck.dependencies || {};
  const peerDependencies = pck.peerDependencies || {};
  Object.keys(dependencies).forEach((key) => externals.push(key));
  Object.keys(peerDependencies).forEach((key) => externals.push(key));
  return [...new Set(externals)];
}

function formatImportPath(id) {
  if (id.match(/^@packages/) || id.match(/^@src/)) {
    const depName = id.split("/")[1];
    return `./${depName}.js`;
  } else if (id.match(/^@lang/)) {
    const depName = id.split("/")[1];
    return `./lang/${depName}`;
  }
}

function getDir(rootSrc) {
  return fs
    .readdirSync(rootSrc)
    .filter((fileName) =>
      fs.statSync(path.resolve(rootSrc, fileName)).isDirectory()
    );
}

module.exports = {
  rollupBuild,
  resolveRoot,
  createInputOptions,
  external: getExternalsDep(),
  formatImportPath,
  getDir,
};
