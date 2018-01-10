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

    entry: {
      app: './index',
      vendor: ['react', 'react-dom'],
    },

    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '../')
      }),
  
      new webpack.optimize.UglifyJsPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: ({ resource }) => /node_modules/.test(resource),
      }),
    ]
  }
);

module.exports = prodConfig;
