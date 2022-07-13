const path = require('path');
const webpack = require('webpack');
const htmlplugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['tsx', 'ts', '*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    port: 8080,
    publicPath: 'http://localhost:8080/dist',
    hotOnly: true,
    historyApiFallback: true, // 重要，不设置路由会找不到
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlplugin({ template: './public/index.html', filename: 'index.html' }),
  ],
};
