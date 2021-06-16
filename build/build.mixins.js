const { nodeResolve } = require("@rollup/plugin-node-resolve")
const babel = require("rollup-plugin-babel")
const commonjs = require("@rollup/plugin-commonjs")
const path = require('path')
const {getExternalsDep} = require('./utils.js')
const fs = require("fs")
const root = path.resolve(__dirname,'../packages/mixins')
const rollup = require("rollup");
const {clean} = require('./build.css.js')

function createConfig(filename) {
    let input = filename
    if (filename !== 'index.js') {
        input = `./src/${filename}`
    }
  return {
    input: path.resolve(root,input),
    external: getExternalsDep('mixins'),
    plugins: [
      nodeResolve(),
      babel({
        exclude: "node_modules/**", // 防止打包node_modules下的文件
        runtimeHelpers: true, // 使plugin-transform-runtime生效
      }),
      commonjs(),
    ],
  };
}

function createOutputOptions(filename) {
  return {
    file: path.resolve(root, `./dist/${filename}`),
    format: "es",
  };
}

const fileList = fs.readdirSync(path.resolve(root, './src'))

fileList.push('index.js')

const build = async () => {
  await clean(path.resolve(root, './dist'))
  const task = fileList.map((filename) => {
    const baseConfig = createConfig(filename);
    const outputConfig = createOutputOptions(filename);
    return rollup.rollup(baseConfig).then(bundle => {
      console.log(filename,'done');
      return bundle.write(outputConfig)
    })
  });
  try {
    await Promise.all(task)
    console.log('all done');
  } catch (error) {
    console.error(error);
  }
};


build()
