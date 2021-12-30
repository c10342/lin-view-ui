const path = require("path");

const fs = require("fs");

const rollup = require("rollup");

const {default:esbuild} = require('rollup-plugin-esbuild')

const commonjs = require('@rollup/plugin-commonjs')

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const alias = require("@rollup/plugin-alias");

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
      alias({
        entries: [
          { find: /^@packages/, replacement: resolveRoot("./packages") },
          { find: /^@src/, replacement: resolveRoot("./src") }
        ]
      }),
      nodeResolve({
        extensions: ['.js', '.json', '.ts']
      }),
      vuePlugin({target: 'browser'}),
      esbuild({
        target:'es2018',
        tsconfig: resolveRoot("./tsconfig.json")
      }),
      commonjs(),
    ],
  };
  return config;
}

function getSrcExternals(){
  const whiteList = ['theme-chalk']
  const dirList = getDir(resolveRoot('./src')).filter(fileName=>!whiteList.includes(fileName))
  return dirList.map(fileName=>`@src/${fileName}`)
}

function getPackagesExternals(){
  return getDir(resolveRoot('./packages')).map(fileName=>`@packages/${fileName}`)
}

function getExternalsDep() {
  const externals = [...getSrcExternals(),...getPackagesExternals()];
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
