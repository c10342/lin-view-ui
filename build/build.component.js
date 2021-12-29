const {
  createInputOptions,
  resolveRoot,
  external,
  formatImportPath,
  getDir,
  rollupBuild,
} = require("./utils.js");

async function buildComponent(fileName) {
  const inputOptions = createInputOptions({
    input: resolveRoot(`./packages/${fileName}/index.ts`),
    external,
  });
  const outputOptions = {
    file: resolveRoot(`./lib/${fileName}.js`),
    format: "es",
    paths: formatImportPath,
  };
  await rollupBuild(inputOptions, outputOptions);
  console.log(fileName, "done");
}

function build() {
  const componentList = getDir(resolveRoot("./packages"));
  componentList.forEach((fileName) => buildComponent(fileName));
}

build();
