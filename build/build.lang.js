const typescript = require("rollup-plugin-typescript2");

const { resolvePackages } = require("./utils");

const fs = require("fs");

function createConfig(type, name) {
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
  return {
    input: resolvePackages(`./locale/src/${name}.ts`),
    output,
    plugins: [typescript()]
  };
}

const lang = fs
  .readdirSync(resolvePackages("./locale/src"))
  .map((name) => name.replace(/\.ts$/, ""));

const config = [];

config.push(...lang.map((name) => createConfig("es", name)));
config.push(...lang.map((name) => createConfig("cjs", name)));

module.exports = config;
