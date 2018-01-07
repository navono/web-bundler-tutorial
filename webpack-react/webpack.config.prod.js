const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

module.exports = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),
  
  entry: [
    './index'
  ],
    
  // see: https://webpack.js.org/configuration/devtool/
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js',
    // Dev and Prod build different values
    // publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { 
            presets: ['env', 'react']
          } 
        }
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, 'src', 'assets', 'scss')],
        use: extractPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // file-loader(for images)
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: 
            {
              name: '[name].[ext]',
              outputPath: './assets/media/' 
            } 
          } 
        ] 
      },
      // file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // extract-text-webpack-plugin instance
    extractPlugin
  ]
}