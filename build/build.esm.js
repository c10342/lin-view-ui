const typescript = require("rollup-plugin-typescript2");

const vuePlugin = require("rollup-plugin-vue");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const {
  resolvePackages,
  components,
  external,
  paths,
  getOutputName
} = require("./utils");

const { babelPlugin } = require("./plugins");

function createConfig(name) {
  const overrides = {
    compilerOptions: {
      declaration: true,
      declarationDir: `./dist/types`
    }
  };
  return {
    input: resolvePackages(`./${name}/index.ts`),
    output: {
      file: `dist/esm/${getOutputName(name)}.js`,
      format: "es",
      paths
    },
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: overrides,
        useTsconfigDeclarationDir: true
      }),
      babelPlugin(),
      vuePlugin()
    ],
    external
  };
}

module.exports = components.map(createConfig);
