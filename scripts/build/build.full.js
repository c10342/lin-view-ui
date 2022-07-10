const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const { terser } = require("rollup-plugin-terser");

const { resolvePackages } = require("./utils");

const { babelPlugin, vuePlugin } = require("./plugins");

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
  plugins: [
    nodeResolve(),
    typescript(),
    babelPlugin(),
    ...vuePlugin(),
    terser()
  ],
  external: ["vue"]
};
