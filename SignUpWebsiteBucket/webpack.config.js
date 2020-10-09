const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    signup: './src/signup/main.js',
    optout: './src/optout/main.js',
  },
  module: {
    rules: [
      { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  output: {
    path: path.resolve(__dirname, '.dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/index.html' , to: 'index.html' },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'signup/index.html',
      template: './src/signup/index.html',
      chunks: ['signup']
    }),
    new HtmlWebpackPlugin({
      filename: 'optout/index.html',
      template: './src/optout/index.html',
      chunks: ['optout']
    }),
  ],
  devServer: {
    hot: true,
  },
};
