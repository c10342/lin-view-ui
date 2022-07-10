const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const {
  resolvePackages,
  components,
  external,
  paths,
  getOutputName
} = require("./utils");

const { babelPlugin, vuePlugin } = require("./plugins");

function createConfig(name) {
  return {
    input: resolvePackages(`./${name}/index.ts`),
    output: {
      file: `dist/lib/${getOutputName(name)}.js`,
      format: "cjs",
      paths,
      exports: "named"
    },
    plugins: [nodeResolve(), typescript(), babelPlugin(), ...vuePlugin()],
    external
  };
}

module.exports = components.map(createConfig);
