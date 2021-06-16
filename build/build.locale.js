const { nodeResolve } = require("@rollup/plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const path = require("path");
const { getExternalsDep } = require("./utils.js");
const fs = require("fs");
const root = path.resolve(__dirname, "../packages/locale");
const rollup = require("rollup");
const { clean } = require("./build.css.js");

const fileList = fs.readdirSync(path.resolve(root, "./src/lang"));

const buildIndex = () => {
  const outputConfig = {
    file: path.resolve(root, "./dist/index.js"),
    format: "es",
  };
  const inputConfig = {
    input: path.resolve(root, "index.js"),
    external: getExternalsDep("locale"),
    plugins: [
      nodeResolve(),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      commonjs(),
    ],
  };

  return rollup.rollup(inputConfig).then((bundle) => {
    console.log("index", "done");
    return bundle.write(outputConfig);
  });
};

const buildLang = () => {
  return fileList.map((filename) => {
    const inputConfig = {input:path.resolve(root, `./src/lang/${filename}`)};
    const outputConfig = {
      file: path.resolve(root, `./dist/lang/${filename}`),
      format: "es",
    };
    return rollup.rollup(inputConfig).then((bundle) => {
      console.log(filename, "done");
      return bundle.write(outputConfig);
    });
  });
};

const build = async () => {
  await clean(path.resolve(root, "./dist"));
  const task = [buildIndex(),...buildLang()];
  try {
    await Promise.all(task);
    console.log("all done");
  } catch (error) {
    console.error(error);
  }
};

build();
