const typescript = require("rollup-plugin-typescript2");

const { resolvePackages } = require("../helper");

const fs = require("fs");
const { rollupBuild } = require("./utils");

const createInputConfig = (name) => {
  return {
    input: resolvePackages(`./locale/src/${name}.ts`),
    plugins: [typescript()]
  };
};

const createOutputConfig = (type, name) => {
  let output = {
    file: `dist/esm/lang/${name}.js`,
    format: "es"
  };
  if (type === "cjs") {
    output = {
      file: `dist/lib/lang/${name}.js`,
      format: "cjs",
      exports: "named"
    };
  }
  return output;
};

const lang = fs
  .readdirSync(resolvePackages("./locale/src"))
  .map((name) => name.replace(/\.ts$/, ""));

const buildLang = async (type, name) => {
  const input = createInputConfig(name);
  const output = createOutputConfig(type, name);
  await rollupBuild(input, output);
  console.log(`build:${type}-${name}`);
};
const build = () => {
  process.setMaxListeners(0);
  lang.forEach((name) => {
    buildLang("cjs", name);
    buildLang("es", name);
  });
};

build();
