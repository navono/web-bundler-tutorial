const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');
const { baseConfig, extractPlugin } = require('./webpack.config.base');


const devConfig = merge(
  baseConfig,
  {
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

    plugins: [
      // Dev only
      new webpack.HotModuleReplacementPlugin(),
      
      // bundle size analyzer
      // new BundleAnalyzerPlugin(),
    ]
  }
)

module.exports = devConfig;
