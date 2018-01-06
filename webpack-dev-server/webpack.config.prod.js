const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: [
    './src/entry.js',
  ],

  // see: https://webpack.js.org/configuration/devtool/
  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // Dev and Prod build different values
    publicPath: '/'
  },

  module: {

  },

  resolve: {
    extensions: ['.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false
    }),
    new CleanWebpackPlugin(['dist']),
  ]
}