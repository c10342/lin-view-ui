const typescript = require("rollup-plugin-typescript2");

const vuePlugin = require("rollup-plugin-vue");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const { resolvePackages } = require("./utils");

const { babelPlugin } = require("./plugins");

module.exports = {
  input: resolvePackages(`./lin-view-ui/index.ts`),
  output: {
    file: `dist/index.js`,
    format: "umd",
    name: "LinViewUi",
    globals: {
      vue: "Vue"
    }
  },
  plugins: [nodeResolve(), typescript(), babelPlugin(), vuePlugin()],
  external: ["vue"]
};
