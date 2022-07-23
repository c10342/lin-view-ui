const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const { terser } = require("rollup-plugin-terser");

const { resolvePackages } = require("../helper");

const { babelPlugin, vuePlugin } = require("./plugins");

const { rollupBuild } = require("./utils");

const input = {
  input: resolvePackages(`./lin-view-ui/index.ts`),
  plugins: [
    nodeResolve(),
    typescript(),
    babelPlugin(),
    ...vuePlugin(),
    terser()
  ],
  external: ["vue"]
};

const output = {
  file: `dist/index.js`,
  format: "umd",
  name: "LinViewUi",
  globals: {
    vue: "Vue"
  }
};

const build = async () => {
  process.setMaxListeners(0);
  await rollupBuild(input, output);
  console.log("build:index.js");
};

build();
