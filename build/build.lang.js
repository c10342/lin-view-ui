const fs = require("fs");
const { createInputConfig, rollupBuild, resolveRoot } = require("./utils.js");

const buildLang = async filename => {
  const inputConfig = createInputConfig({
    input: resolveRoot(`./src/locale/src/lang/${filename}`)
  });
  const outputConfig = {
    file: resolveRoot(`./lib/lang/${filename}`),
    format: "es"
  };
  await rollupBuild(inputConfig, outputConfig);
  console.log(filename, "done");
};

const build = async () => {
  const langList = fs.readdirSync(resolveRoot("./src/locale/src/lang"));
  langList.forEach(fileName => buildLang(fileName));
};

build();
