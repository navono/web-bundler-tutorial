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

  // Dev only
  devtool: 'inline-source-map',
  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./dist"),
    compress: true,
    hot: true,
    port: 3000,
    historyApiFallback: true,
   //  stats: 'errors-only',
    open: true,
   },

  entry: [
    'react-hot-loader/patch',
    // dev-server: 遇到错误会重新刷新浏览器
    // only-dev-server: 遇到错误不会重新刷新浏览器，React App推荐使用。因为不会重置状态
    // 'webpack/hot/only-dev-server',

    // relative path declaration
    './index',
  ],

  output: {
    path: path.resolve(__dirname, './dist'),
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
    new HtmlWebpackPlugin({
      title: 'React',
      template: 'index.html',
    }),

    // Dev only
    new webpack.HotModuleReplacementPlugin(),
    // bundle size analyzer
    // new BundleAnalyzerPlugin(),

    // extract-text-webpack-plugin instance
    extractPlugin
  ]
}