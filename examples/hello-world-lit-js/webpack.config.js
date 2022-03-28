const { resolve } = require('path');

module.exports = {
  entry: './hello-world.js',
  resolve: {
    extensions: ['.js']
  },
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  }
};