const {
  getExternalsDep,
  createInputConfig,
  rollupBuild,
  resolveRoot,
  formatImportPath,
  getDir
} = require("./utils.js");

const buildOne = async filename => {
  const inputConfig = createInputConfig({
    input: resolveRoot(`./src/${filename}/index.js`),
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

const build = async () => {
  const externalDir = ["test-utils", "theme-chalk"];
  const srcDir = getDir(resolveRoot("./src")).filter(
    fileName => !externalDir.includes(fileName)
  );
  srcDir.forEach(fileName => buildOne(fileName));
};

build();
