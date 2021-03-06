const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.build.base');

const util = require('./util');

const entry = util.getComponentEntries();

const componentConfig = {
  entry,
  output: {
    path: util.output,
    filename: '[name]/index.js',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
    library: '[name]'
  },
  externals: {
    ...util.getExternalsList()
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/style.css'
    })
  ]
};

module.exports = merge(baseConfig, componentConfig);
