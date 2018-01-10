const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const { baseConfig, extractPlugin } = require('./webpack.config.base');

const prodConfig = merge(
  baseConfig,
  {
    // see: https://webpack.js.org/configuration/devtool/
    devtool: 'source-map',

    entry: [
      './index'
    ],

    plugins: [
      new CleanWebpackPlugin(['dist']),
  
      new webpack.optimize.UglifyJsPlugin(),
    ]
  }
);

module.exports = prodConfig;
