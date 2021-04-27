const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const util = require('./util');

// const getAssetsEntries = (pathStr) => {
//   const files = fs.readdirSync(resolve(pathStr));
//   const assetsEntries = files.reduce((ret, item) => {
//     const itemPath = path.join(pathStr, item);
//     const myPath = resolve(`${itemPath}`);
//     const stat = fs.lstatSync(myPath);
//     if (stat.isFile()) {
//       ret[`${pathStr}/${item}`] = myPath;
//     } else {
//       const result = getAssetsEntries(`${pathStr}/${item}`);
//       ret = {
//         ...ret,
//         ...result
//       };
//     }
//     return ret;
//   }, {});
//   return assetsEntries;
// };

const getAssetsEntries = util.getAssetsEntries;

const entry = {
  ...getAssetsEntries('js'),
  ...getAssetsEntries('locale'),
  ...getAssetsEntries('mixins'),
  ...getAssetsEntries('utils')
};

const assetsConfig = {
  mode: 'production',
  entry: entry,
  output: {
    path: util.output,
    filename: `assets/[name]`,
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
    library: '[name]'
  },
  externals: {
    ...util.getExternalsList()
  }
};

module.exports = merge(baseConfig, assetsConfig);
