const {resolve} = require('path');
const Dotenv = require('dotenv-webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  entry: {
    bundle: './widget.js',
    demo: './demo.js',
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9001,
  },
};
