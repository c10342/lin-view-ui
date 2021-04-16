const path = require('path');

const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.build.base');

const output = path.resolve(__dirname, '../lib');
const entry = path.resolve(__dirname, '../src/index.js');

const indexConfig = {
  entry,
  output: {
    path: output,
    filename: 'index.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'LinViewUi'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};

module.exports = merge(baseConfig, indexConfig);
