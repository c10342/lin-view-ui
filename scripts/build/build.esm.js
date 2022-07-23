const typescript = require("rollup-plugin-typescript2");

const { nodeResolve } = require("@rollup/plugin-node-resolve");

const {
  components,
  external,
  paths,
  getOutputName,
  rollupBuild
} = require("./utils");

const { babelPlugin, vuePlugin } = require("./plugins");

const { resolvePackages } = require("../helper");

const createInputConfig = (name) => {
  const overrides = {
    compilerOptions: {
      declaration: true,
      declarationDir: `./dist/types`
    }
  };
  return {
    input: resolvePackages(`./${name}/index.ts`),
    plugins: [
      nodeResolve(),
      typescript({
        tsconfigOverride: overrides,
        useTsconfigDeclarationDir: true
      }),
      babelPlugin(),
      ...vuePlugin()
    ],
    external
  };
};

const createOutputConfig = (name) => {
  return {
    file: `dist/esm/${getOutputName(name)}.js`,
    format: "es",
    paths
  };
};

const buildComponent = async (name) => {
  const input = createInputConfig(name);
  const output = createOutputConfig(name);
  await rollupBuild(input, output);
  console.log(`build:esm-${name}`);
};

const build = () => {
  process.setMaxListeners(0);
  components.forEach(buildComponent);
};

build();
