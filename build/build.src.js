const {
  resolveRoot,
  createInputOptions,
  external,
  formatImportPath,
  getDir,
  rollupBuild
} = require("./utils");

async function buildAsset(fileName) {
  const inputOptions = createInputOptions({
    input: resolveRoot(`./src/${fileName}/index.ts`),
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
  const externalDir = ["test-utils", "theme-chalk"];
  const srcDir = getDir(resolveRoot("./src")).filter(
    (fileName) => !externalDir.includes(fileName)
  );
  srcDir.forEach((fileName) => buildAsset(fileName));
}

build();
