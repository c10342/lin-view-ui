const path = require("path");
const fs = require("fs");
const {
  getExternalsDep,
  createEsOutput,
  createInputConfig,
  clean,
  rollupBuild,
} = require("./utils.js");
const root = path.resolve(__dirname, "../packages/locale");

const resolve = pathSrc => path.resolve(root, pathSrc);

const langList = fs.readdirSync(resolve( "./src/lang"));

const buildIndex = async () => {
  const inputConfig = createInputConfig({
    input: resolve("index.js"),
    external: [...getExternalsDep("locale"),'./src/lang/zh-CN.js'],
  });
  const outputConfig = createEsOutput(resolve("./dist/index.js"), {
    paths(id) {
      if (id.includes(path.normalize('src/lang/zh-CN.js'))) {
        return './lang/zh-CN.js'
      }
    }
  });

  await rollupBuild(inputConfig, outputConfig);
  console.log("index", "done");
};

const buildLang = async (filename) => {
  const inputConfig = createInputConfig({
    input: resolve(`./src/lang/${filename}`),
  });
  const outputConfig = createEsOutput(resolve(`./dist/lang/${filename}`));
  await rollupBuild(inputConfig, outputConfig);
  console.log(filename, "done");
};

const buildAllLang = () => {
  langList.forEach((filename) => buildLang(filename));
};

const build = async () => {
  await clean(resolve("./dist"));
  buildAllLang();
  buildIndex();
};

build();
