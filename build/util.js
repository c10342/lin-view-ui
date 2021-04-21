const path = require('path');
const fs = require('fs');

const resolve = (dir) => path.resolve(__dirname, '../src', dir);

const packageJson = require('../package.json');

const dependencies = {};

for (const key in packageJson.dependencies) {
  dependencies[key] = {
    root: key,
    commonjs: key,
    commonjs2: key,
    amd: key
  };
}

const utilsList = fs.readdirSync(resolve('utils'));
const mixinsList = fs.readdirSync(resolve('mixins'));
const jsList = fs.readdirSync(resolve('js'));
const imageList = fs.readdirSync(resolve('images'));

function getComponentExternals() {
  const obj = {};
  const compnentEntry = getComponentEntries();
  Object.keys(compnentEntry).forEach((name) => {
    obj[`packages/${name}/index.js`] = `lin-view-ui/lib/${name}/index.js`;
  });
  return obj;
}

const getExternalsList = () => {
  const externals = {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
    ...dependencies,
    'src/locale/index.js': 'lin-view-ui/lib/assets/locale/index.js',
    'src/locale/lang/zh-CN.js': 'lin-view-ui/lib/assets/locale/lang/zh-CN.js',
    'src/locale/lang/en-US.js': 'lin-view-ui/lib/assets/locale/lang/en-US.js',
    'src/locale/format.js': 'lin-view-ui/lib/assets/locale/format.js',
    'src/fonts/iconfont.css': 'lin-view-ui/src/fonts/iconfont.css',
    'flv.js/dist/flv.js': 'flv.js/dist/flv.js',
    ...getComponentExternals()
  };

  utilsList.forEach(function (file) {
    file = path.basename(file);
    externals[`src/utils/${file}`] = `lin-view-ui/lib/assets/utils/${file}`;
  });
  mixinsList.forEach(function (file) {
    file = path.basename(file);
    externals[`src/mixins/${file}`] = `lin-view-ui/lib/assets/mixins/${file}`;
  });
  jsList.forEach(function (file) {
    file = path.basename(file);
    externals[`src/js/${file}`] = `lin-view-ui/lib/assets/js/${file}`;
  });
  imageList.forEach(function (file) {
    file = path.basename(file);
    externals[`src/images/${file}`] = `lin-view-ui/src/images/${file}`;
  });
  return externals;
};

const getAssetsEntries = (pathStr) => {
  const files = fs.readdirSync(resolve(pathStr));
  const assetsEntries = files.reduce((ret, item) => {
    const itemPath = path.join(pathStr, item);
    const myPath = resolve(`${itemPath}`);
    const stat = fs.lstatSync(myPath);
    if (stat.isFile()) {
      ret[`${pathStr}/${item}`] = myPath;
    }
    return ret;
  }, {});
  return assetsEntries;
};

const getComponentEntries = () => {
  const files = fs.readdirSync(path.join(__dirname, '../packages'));
  const componentEntries = files.reduce((ret, item) => {
    const itemPath = path.join('../packages', item);
    const [name] = item.split('.');
    ret[name] = path.join(__dirname, `${itemPath}`);
    return ret;
  }, {});
  return componentEntries;
};

const output = path.resolve(__dirname, '../lib');

module.exports = {
  getExternalsList,
  getAssetsEntries,
  getComponentEntries,
  output
};
