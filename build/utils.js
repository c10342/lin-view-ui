const path = require("path");
const fs = require("fs");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const rollup = require("rollup");
const del = require("del");
const { terser } = require("rollup-plugin-terser");
const image = require("@rollup/plugin-image");
const pck = require("../package.json");

const root = path.resolve(__dirname, "../");
const packagesDir = path.resolve(root, "./packages");
const srcDir = path.resolve(root, "./src");

function getDir(rootSrc) {
  return fs
    .readdirSync(rootSrc)
    .filter(fileName =>
      fs.statSync(path.resolve(rootSrc, fileName)).isDirectory()
    );
}

function getExternalsDep() {
  const packagesDirList = getDir(packagesDir);
  const srcDirList = getDir(srcDir);
  const externals = [];
  packagesDirList.forEach(dep => {
    externals.push(`@packages/${dep}`);
  });
  srcDirList.forEach(dep => {
    externals.push(`@src/${dep}`);
  });
  const dependencies = pck.dependencies || {};
  const peerDependencies = pck.peerDependencies || {};
  Object.keys(dependencies).forEach(key => externals.push(key));
  Object.keys(peerDependencies).forEach(key => externals.push(key));
  return [...new Set(externals), "@lang/zh-CN.js"];
}

function createInputConfig(options = {}) {
  const config = {
    input: options.input,
    external: options.external,
    plugins: [
      nodeResolve({
        // preferBuiltins: true
      }),
      vue({}),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true // 使plugin-transform-runtime生效
      }),
      commonjs(),
      image()
    ]
  };
  if (options.minify) {
    config.plugins.push(terser());
  }
  if (options.plugins) {
    config.plugins.unshift(...options.plugins);
  }
  return config;
}

async function rollupBuild(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

const clean = cleanPath => {
  return del(cleanPath, {
    force: true
  });
};

const formatImportPath = id => {
  if (id.match(/^@packages/) || id.match(/^@src/)) {
    const depName = id.split("/")[1];
    return `./${depName}.js`;
  } else if (id.match(/^@lang/)) {
    const depName = id.split("/")[1];
    return `./lang/${depName}`;
  }
};

const resolveRoot = pathSrc => path.resolve(root, pathSrc);

module.exports = {
  getExternalsDep,
  createInputConfig,
  rollupBuild,
  clean,
  root,
  getDir,
  formatImportPath,
  resolveRoot
};
