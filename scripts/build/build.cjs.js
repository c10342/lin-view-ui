const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const {
  components,
  external,
  paths,
  getOutputName,
  rollupBuild
} = require("./utils");

const { resolvePackages } = require("../helper");

const { babelPlugin, vuePlugin } = require("./plugins");

const createInputConfig = (name) => {
  return {
    input: resolvePackages(`./${name}/index.ts`),
    plugins: [nodeResolve(), typescript(), babelPlugin(), ...vuePlugin()],
    external
  };
};

const createOutputConfig = (name) => {
  return {
    file: `dist/lib/${getOutputName(name)}.js`,
    format: "cjs",
    paths,
    exports: "named"
  };
};

const buildComponent = async (name) => {
  const input = createInputConfig(name);
  const output = createOutputConfig(name);
  await rollupBuild(input, output);
  console.log(`build:cjs-${name}`);
};

const build = () => {
  process.setMaxListeners(0);
  components.forEach(buildComponent);
};

build();
