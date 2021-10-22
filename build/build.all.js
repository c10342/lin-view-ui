const { createInputConfig, rollupBuild, resolveRoot } = require("./utils.js");
const alias = require("@rollup/plugin-alias");

const build = async () => {
  const inputConfig = createInputConfig({
    input: resolveRoot(`./src/index.js`),
    external: ["vue"],
    plugins: [
      alias({
        entries: [
          { find: /^@packages/, replacement: resolveRoot("./packages") },
          { find: /^@src/, replacement: resolveRoot("./src") },
          { find: /^@lang/, replacement: resolveRoot("./src/locale/src/lang") }
        ]
      })
    ],
    minify: true
  });
  const outputConfig = {
    file: resolveRoot(`./lib/index.js`),
    format: "umd",
    name: "LinViewUi",
    globals: {
      vue: "Vue"
    }
  };

  await rollupBuild(inputConfig, outputConfig);

  console.log("index", "done");
};

build();
