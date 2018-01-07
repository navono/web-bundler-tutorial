const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

module.exports = {
  // absolute path for project root
  context: path.resolve(__dirname, 'src'),

  entry: [
     // relative path declaration
    './app.jsx',
  ],

  // Dev only
  devtool: 'inline-source-map',
  devServer: {
   // static files served from here
   contentBase: path.resolve(__dirname, "./dist/assets/media"),
   compress: true,
   port: 3000,
   stats: 'errors-only',
   open: true,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js',
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
    extensions: ['.js']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React',
      template: 'index.html',
    }),

    // Dev only
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
    // extract-text-webpack-plugin instance
    extractPlugin
  ]
}