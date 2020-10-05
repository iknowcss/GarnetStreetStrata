const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  module: {
    rules: [
      { test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader'] }
    ]
  },
  output: {
    path: path.resolve(__dirname, '.dist'),
    filename: 'main.js',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
  devServer: {
    hot: true,
  },
};
