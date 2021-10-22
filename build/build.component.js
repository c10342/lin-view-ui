const {
  getExternalsDep,
  createInputConfig,
  rollupBuild,
  getDir,
  formatImportPath,
  resolveRoot
} = require("./utils.js");

const buildComponent = async filename => {
  const inputConfig = createInputConfig({
    input: resolveRoot(`./packages/${filename}/index.js`),
    external: getExternalsDep()
  });
  const outputConfig = {
    file: resolveRoot(`./lib/${filename}.js`),
    format: "es",
    paths: formatImportPath
  };
  await rollupBuild(inputConfig, outputConfig);

  console.log(filename, "done");
};

const build = () => {
  const componentList = getDir(resolveRoot("./packages"));
  componentList.forEach(filename => buildComponent(filename));
};

build();
