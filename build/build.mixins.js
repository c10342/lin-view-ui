const path = require("path");
const fs = require("fs");
const {
  getExternalsDep,
  createInputConfig,
  createEsOutput,
  rollupBuild,
  clean,
} = require("./utils.js");
const root = path.resolve(__dirname, "../packages/mixins");

const resolve = pathSrc => path.resolve(root, pathSrc);

function createConfig(filename) {
  let input = filename;
  if (filename !== "index.js") {
    input = `./src/${filename}`;
  }
  return createInputConfig({
    input: resolve(input),
    external: getExternalsDep("mixins"),
  });
}

const buildOne = async (filename) => {
  const inputConfig = createConfig(filename);
  const outputConfig = createEsOutput(resolve(`./dist/${filename}`));
  await rollupBuild(inputConfig, outputConfig);
  console.log(filename,'done');
};

const fileList = fs.readdirSync(path.resolve(root, "./src"));

fileList.push("index.js");

const build = async () => {
  await clean(path.resolve(root, "./dist"));
  fileList.forEach((filename) => buildOne(filename));
};

build();
