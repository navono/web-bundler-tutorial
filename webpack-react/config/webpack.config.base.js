const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractPlugin = new ExtractTextPlugin({
  filename: './assets/css/app.css'
});

const baseConfig = {
  // absolute path for project root
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './assets/js/[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: /src/,
        exclude: /node_modules/,
        use:
        [
          {
            loader: "babel-loader",
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, '../', 'src', 'assets', 'scss')],
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
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")()],
              },
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
    new HtmlWebpackPlugin({
      title: 'React',
      template: 'index.html',
    }),

    // extract-text-webpack-plugin instance
    extractPlugin
  ]
}

module.exports = {
  baseConfig,
  extractPlugin
}
