const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    bundle: './hello-world.js',
    demo: './demo.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: "./public/index.html"
  })],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};