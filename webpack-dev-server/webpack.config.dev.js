const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/entry.js',
  ],

  // Dev only
  devtool: 'source-map',
  devServer: {
    port: 3000,
    inline: true,
    hot: true,
    contentBase: './public'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    // Dev and Prod build different values
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
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

    // Dev only
    new webpack.HotModuleReplacementPlugin(),
  ]
}