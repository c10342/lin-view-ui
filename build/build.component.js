const { nodeResolve } = require("@rollup/plugin-node-resolve");
const vue = require("rollup-plugin-vue");
const babel = require("rollup-plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { getExternalsDep } = require("./utils.js");
const path = require("path");
const rollup = require("rollup");
const root = path.resolve(__dirname, "../packages");
const { buildScss, copyfont, clean } = require("./build.css.js");
const fs = require("fs");

function createConfig(filename) {
  return {
    input: path.resolve(root, `./${filename}/index.js`),
    external: getExternalsDep(filename),
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
}

function createOutputOptions(filename) {
  return {
    file: path.resolve(root, `./${filename}/dist/index.js`),
    format: "es",
  };
}

const buildComponent = async (comp) => {
  const outputOptions = createOutputOptions(comp);
  const baseConfig = createConfig(comp);
  await clean(path.resolve(root, `./${comp}/dist`));
  const bundle = await rollup.rollup(baseConfig);
  await bundle.write(outputOptions);
  await buildScss(
    path.resolve(root, `./theme-chalk/src/${comp}.scss`),
    path.resolve(root, `./${comp}/dist`)
  );
  await copyfont(path.resolve(root, `./${comp}/dist/fonts`),comp);
  console.log(comp, "done");
};

// buildComponent("video-player");

const whiteList = ['locale','mixins','theme-chalk','utils']
const compList = fs.readdirSync(root).filter(fileName => !whiteList.includes(fileName))
// console.log(compList);

compList.forEach(comp=>buildComponent(comp))
