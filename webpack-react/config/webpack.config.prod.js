const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

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

      new UglifyWebpackPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // minChunks: ({ resource }) => /node_modules/.test(resource),
      }),
    ],

    performance: {
      hints: "warning", // "error" or false are valid too
      maxEntrypointSize: 50000, // in bytes, default 250k
      maxAssetSize: 450000, // in bytes
    }
  }
);

module.exports = prodConfig;
