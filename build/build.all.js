const {
  getExternalsDep,
  clean,
  createInputConfig,
  createEsOutput,
  rollupBuild,
  whiteList,
  createUmdOutput
} = require("./utils.js");
const path = require("path");
const fs = require("fs");
const root = path.resolve(__dirname, "../packages/lin-view-ui");
const { buildScss, copyfont } = require("./build.css.js");
const resolve = (pathSrc) => path.resolve(root, pathSrc);
const packagesRoot = path.resolve(__dirname, "../packages");
const resolvePackage = (pathSrc) => path.resolve(packagesRoot, pathSrc);
const formatImportPath = (id) => {
  if (id.match(/^@lin-view-ui/)) {
    const depName = id.split("/")[1];
    return `./${depName}.js`;
  }
};

const buildesIndex = async () => {
  const inputConfig = createInputConfig({
    input: resolve("./index.js"),
    external: getExternalsDep('lin-view-ui')
  });
  const outputConfig = createEsOutput(resolve("./lib/index.js"), {
    paths:formatImportPath
  });
  await rollupBuild(inputConfig, outputConfig);
  await buildScss(
    resolve(`../theme-chalk/src/index.scss`),
    resolve(`./lib/theme-chalk`),
    {
      basename: "index",
    }
  );
  await copyfont(resolve(`./lib/theme-chalk/fonts`), "index");
  console.log("es build success");
};
const buildumdIndex = async () => {
  const inputConfig = createInputConfig({
    input: resolve("./index.js"),
    external: ['vue']
  });
  const outputConfig = createUmdOutput(resolve("./lib/index.umd.js"), {
    name: 'LinViewUi',
    globals: {
      vue: 'Vue'
    }
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("umd build success");
};

function createCompConfig(filename) {
  return createInputConfig({
    input: resolvePackage(`./${filename}/index.js`),
    external: getExternalsDep(filename),
  });
}

const buildesComponent = async (comp) => {
  const outputConfig = createEsOutput(resolve(`./lib/${comp}.js`), {
    paths: formatImportPath,
  });
  const inputConfig = createCompConfig(comp);
  await rollupBuild(inputConfig, outputConfig);
  await buildScss(
    resolvePackage(`./theme-chalk/src/${comp}.scss`),
    resolve(`./lib/theme-chalk`),
    {
      basename: comp,
    }
  );
  console.log(comp, "done");
};

const buildesUtils = async () => {
  const inputConfig = createInputConfig({
    input: resolvePackage("./utils/index"),
    external: getExternalsDep("utils"),
  });
  const outputConfig = createEsOutput(resolve(`./lib/utils.js`), {
    paths: formatImportPath,
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("utils", "done");
};
const buildesLocale = async () => {
  const buildIndex = async () => {
    const inputConfig = createInputConfig({
      input: resolvePackage("./locale/index"),
      external: [...getExternalsDep("locale"), "./src/lang/zh-CN.js"],
    });
    const outputConfig = createEsOutput(resolve(`./lib/locale.js`), {
      paths(id) {
        if (id.includes(path.normalize("src/lang/zh-CN.js"))) {
          return "./lang/zh-CN.js";
        }
        const result = formatImportPath(id)
        if (result) {
          return result
        }
      },
    });

    await rollupBuild(inputConfig, outputConfig);
  };
  const buildLang = async () => {
    const langList = fs.readdirSync(resolvePackage("./locale/src/lang"));
    for (let i = 0; i < langList.length; i++) {
      const filename = langList[i];
      const inputConfig = createInputConfig({
        input: resolvePackage(`./locale/src/lang/${filename}`),
      });
      const outputConfig = createEsOutput(resolve(`./lib/lang/${filename}`));
      await rollupBuild(inputConfig, outputConfig);
    }
  };
  await buildIndex();
  await buildLang();
  console.log("locale", "done");
};

const buildesMixins = async () => {
  const inputConfig = createInputConfig({
    input: resolvePackage("./mixins/index"),
    external: getExternalsDep("mixins"),
  });
  const outputConfig = createEsOutput(resolve(`./lib/mixins.js`), {
    paths: formatImportPath,
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("mixins", "done");
};

const compList = fs
  .readdirSync(packagesRoot)
  .filter((fileName) => !whiteList.includes(fileName));

const buildesDist = async () => {
  // await clean(resolve(`./lib`));
  buildesIndex();
  compList.forEach((comp) => buildesComponent(comp));
  buildesUtils();
  buildesLocale();
  buildesMixins();
};

const buildAll = async () => {
  await clean(resolve(`./lib`));
  buildumdIndex()
  buildesDist()
};

buildAll();
