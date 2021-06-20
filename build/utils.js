const path = require("path");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const rollup = require("rollup");
const del = require("del");
const { terser } = require("rollup-plugin-terser");

const root = path.resolve(__dirname, "../packages");

function getExternalsDep(name) {
  const dir = path.resolve(root, name);
  const pck = require(path.resolve(dir, "./package.json"));

  const dependencies = pck.dependencies || {};
  const peerDependencies = pck.peerDependencies || {}

  const externals =[];

  Object.keys(dependencies).forEach(key=>externals.push(key))
  Object.keys(peerDependencies).forEach(key=>externals.push(key))

  return [...new Set(externals),'flv.js/dist/flv.js'];
}

function createInputConfig(options = {}) {
  const config = {
    input: options.input,
    external: options.external,
    plugins: [
      nodeResolve(),
      vue({}),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      commonjs(),
    ],
  };
  if (options.minify) {
    config.plugins.push(terser())
  }
  return config
}

function createEsOutput(distPath,options={}) {
  return {
    file:distPath,
    format: "es",
    ...options
  };
}
function createUmdOutput(distPath,options={}) {
  return {
    file:distPath,
    format: "umd",
    ...options
  };
}

async function rollupBuild(inputOptions,outputOptions){
  const bundle = await rollup.rollup(inputOptions)
  await bundle.write(outputOptions)
}

const clean = (cleanPath) => {
  return del(cleanPath, {
    force: true,
  });
};

const whiteList = ["locale", "mixins", "theme-chalk", "utils", "lin-view-ui"];

module.exports = {
  getExternalsDep,
  createInputConfig,
  createEsOutput,
  rollupBuild,
  clean,
  whiteList,
  createUmdOutput
}
