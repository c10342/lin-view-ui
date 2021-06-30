const {
  getExternalsDep,
  clean,
  createEsOutput,
  createInputConfig,
  rollupBuild,
  whiteList
} = require("./utils.js");
const path = require("path");
const fs = require("fs");
const root = path.resolve(__dirname, "../packages");
const { buildScss, copyfont } = require("./build.css.js");

const resolve = pathSrc => path.resolve(root, pathSrc);

function createConfig(filename) {
  return createInputConfig({
    input: resolve(`./${filename}/index.js`),
    external: getExternalsDep(filename)
  });
}

const buildComponent = async comp => {
  const inputConfig = createConfig(comp);
  const outputConfig = createEsOutput(resolve(`./${comp}/dist/index.js`));
  await clean(resolve(`./${comp}/dist`));
  await rollupBuild(inputConfig, outputConfig);
  await buildScss(
    [
      resolve(`./theme-chalk/src/${comp}.scss`),
      resolve(`./theme-chalk/src/base.scss`)
    ],
    resolve(`./${comp}/dist`)
  );
  await copyfont(resolve(`./${comp}/dist/fonts`));
  console.log(comp, "done");
};

// buildComponent("button");

const compList = fs
  .readdirSync(root)
  .filter(fileName => !whiteList.includes(fileName));

const build = () => {
  compList.forEach(comp => buildComponent(comp));
};

build();
