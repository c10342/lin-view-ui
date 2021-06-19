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

function createIndexConfig() {
  return {
    input: path.resolve(root, "./lin-view-ui/index.js"),
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
    file: path.resolve(root, "./lin-view-ui/es/index.js"),
    format: "es",
  };
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
};

buildes()

