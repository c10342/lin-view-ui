const path = require("path");
const fs = require("fs");
const {
  getExternalsDep,
  createEsOutput,
  createInputConfig,
  rollupBuild,
  clean
} = require("./utils.js");

const root = path.resolve(__dirname, "../packages/utils");

const resolve = pathSrc => {
  return path.resolve(root, pathSrc);
};

function createConfig(filename) {
  let input = filename;
  if (filename !== "index.js") {
    input = `./src/${filename}`;
  }
  return createInputConfig({
    input: resolve(input),
    external: getExternalsDep("utils")
  });
}

const buildOne = async filename => {
  const inputOptions = createConfig(filename);
  const outputOptions = createEsOutput(resolve(`./dist/${filename}`));
  await rollupBuild(inputOptions, outputOptions);
  console.log(filename, "done");
};

const fileList = fs.readdirSync(resolve("./src"));

fileList.push("index.js");

const build = async () => {
  await clean(resolve("./dist"));
  fileList.forEach(filename => buildOne(filename));
};

build();
