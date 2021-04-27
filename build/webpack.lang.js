const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');

const util = require('./util');

const assetsConfig = {
  mode: 'production',
  entry: util.getAssetsEntries('locale/lang'),
  output: {
    path: util.output,
    filename: `assets/[name]`,
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: '[name]'
  },
  externals: {
    ...util.getExternalsList()
  }
};

module.exports = merge(baseConfig, assetsConfig);
