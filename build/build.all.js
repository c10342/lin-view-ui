const { nodeResolve } = require("@rollup/plugin-node-resolve");
const vue = require("rollup-plugin-vue");
const babel = require("rollup-plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const { getExternalsDep } = require("./utils.js");
const path = require("path");
const rollup = require("rollup");
const root = path.resolve(__dirname, "../packages/lin-view-ui");
const { buildScss, copyfont, clean } = require("./build.css.js");
const fs = require("fs");

function createIndexConfig() {
  return {
    input: path.resolve(root, "./index.js"),
    external: ["vue"],
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

const buildes = async () => {
  const inputOptions = createIndexConfig();
  const outputOptions = {
    file: path.resolve(root, "./es/index.js"),
    format: "es",
  };
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
  await buildScss(
    path.resolve(root, `../theme-chalk/src/index.scss`),
    path.resolve(root, `./es/theme-chalk`),
    {
      basename:'index'
    }
  );
  await copyfont(path.resolve(root, `./es/theme-chalk/fonts`), "index");
  console.log("build success");
};

const packagesRoot = path.resolve(__dirname, "../packages");
function createCompConfig(filename) {
  return {
    input: path.resolve(packagesRoot, `./${filename}/index.js`),
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
    file: path.resolve(root, `./es/${filename}.js`),
    format: "es",
  };
}

const buildComponent = async (comp) => {
  const outputOptions = createOutputOptions(comp);
  const inputConfig = createCompConfig(comp);
  const bundle = await rollup.rollup(inputConfig);
  await bundle.write(outputOptions);
  await buildScss(
    path.resolve(packagesRoot, `./theme-chalk/src/${comp}.scss`),
    path.resolve(root, `./es/theme-chalk`),
    {
      basename: comp,
    }
  );
  console.log(comp, "done");
};

const whiteList = ["locale", "mixins", "theme-chalk", "utils", "lin-view-ui"];
const compList = fs
  .readdirSync(packagesRoot)
  .filter((fileName) => !whiteList.includes(fileName));

const buildAll = async () => {
  await clean(path.resolve(root, `./es`));
  buildes();
  compList.forEach((comp) => buildComponent(comp));
};

buildAll()
