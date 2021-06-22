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
const alias = require("@rollup/plugin-alias");
const packages = require("../package.json");
const root = path.resolve(__dirname, "../packages/lin-view-ui");
const { buildScss, copyfont } = require("./build.css.js");
const resolveInput = pathSrc => path.resolve(root, pathSrc);
const packagesRoot = path.resolve(__dirname, "../packages");
const resolvePackage = pathSrc => path.resolve(packagesRoot, pathSrc);
const resolveOutput = pathSrc => path.resolve(__dirname, "../", pathSrc);

const formatImportPath = id => {
  if (id.match(/^@lin-view-ui/)) {
    const depName = id.split("/")[1];
    return `./${depName}.js`;
  }
};

const getIndexExternal = () => {
  const dependencies = packages.dependencies || {};
  const peerDependencies = packages.peerDependencies || {};
  const externals = [];
  Object.keys(dependencies).forEach(key => externals.push(key));
  Object.keys(peerDependencies).forEach(key => externals.push(key));
  return [...new Set(externals), "flv.js/dist/flv.js"];
};

const buildesIndex = async () => {
  const inputConfig = createInputConfig({
    input: resolveInput("./index.js"),
    external: [
      ...new Set([...getIndexExternal(), ...getExternalsDep("lin-view-ui")])
    ],
    plugins: [
      alias({
        entries: [{ find: /^@lin-view-ui/, replacement: packagesRoot }]
      })
    ]
  });
  const outputConfig = createEsOutput(resolveOutput("./lib/index.js"), {
    paths: formatImportPath
  });
  await rollupBuild(inputConfig, outputConfig);
  await buildScss(
    resolveInput(`../theme-chalk/src/index.scss`),
    resolveOutput(`./lib/theme-chalk`),
    {
      basename: "index"
    }
  );
  await copyfont(resolveOutput(`./lib/theme-chalk/fonts`), "index");
  console.log("es build success");
};
const buildumdIndex = async () => {
  const inputConfig = createInputConfig({
    input: resolveInput("./index.js"),
    external: ["vue"],
    minify: true,
    plugins: [
      alias({
        entries: [{ find: /^@lin-view-ui/, replacement: packagesRoot }]
      })
    ]
  });
  const outputConfig = createUmdOutput(resolveOutput("./lib/index.umd.js"), {
    name: "LinViewUi",
    globals: {
      vue: "Vue"
    }
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("umd build success");
};

function createCompConfig(filename) {
  return createInputConfig({
    input: resolvePackage(`./${filename}/index.js`),
    external: getExternalsDep(filename)
  });
}

const buildesComponent = async comp => {
  const outputConfig = createEsOutput(resolveOutput(`./lib/${comp}.js`), {
    paths: formatImportPath
  });
  const inputConfig = createCompConfig(comp);
  await rollupBuild(inputConfig, outputConfig);
  await buildScss(
    resolvePackage(`./theme-chalk/src/${comp}.scss`),
    resolveOutput(`./lib/theme-chalk`),
    {
      basename: comp
    }
  );
  console.log(comp, "done");
};

const buildesUtils = async () => {
  const inputConfig = createInputConfig({
    input: resolvePackage("./utils/index"),
    external: getExternalsDep("utils")
  });
  const outputConfig = createEsOutput(resolveOutput(`./lib/utils.js`), {
    paths: formatImportPath
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("utils", "done");
};
const buildesLocale = async () => {
  const buildIndex = async () => {
    const inputConfig = createInputConfig({
      input: resolvePackage("./locale/index"),
      external: [...getExternalsDep("locale"), "./src/lang/zh-CN.js"]
    });
    const outputConfig = createEsOutput(resolveOutput(`./lib/locale.js`), {
      paths(id) {
        if (id.includes(path.normalize("src/lang/zh-CN.js"))) {
          return "./lang/zh-CN.js";
        }
        const result = formatImportPath(id);
        if (result) {
          return result;
        }
      }
    });

    await rollupBuild(inputConfig, outputConfig);
  };
  const buildLang = async () => {
    const langList = fs.readdirSync(resolvePackage("./locale/src/lang"));
    for (let i = 0; i < langList.length; i++) {
      const filename = langList[i];
      const inputConfig = createInputConfig({
        input: resolvePackage(`./locale/src/lang/${filename}`)
      });
      const outputConfig = createEsOutput(
        resolveOutput(`./lib/lang/${filename}`)
      );
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
    external: getExternalsDep("mixins")
  });
  const outputConfig = createEsOutput(resolveOutput(`./lib/mixins.js`), {
    paths: formatImportPath
  });
  await rollupBuild(inputConfig, outputConfig);
  console.log("mixins", "done");
};

const compList = fs
  .readdirSync(packagesRoot)
  .filter(fileName => !whiteList.includes(fileName));

const buildesDist = async () => {
  buildesIndex();
  compList.forEach(comp => buildesComponent(comp));
  buildesUtils();
  buildesLocale();
  buildesMixins();
};

const buildAll = async () => {
  await clean(resolveOutput(`./lib`));
  buildumdIndex();
  buildesDist();
};

buildAll();
