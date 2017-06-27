const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    modules: ['node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  entry: path.resolve(__dirname, 'src/index'),
  plugins: [
    new CopyWebpackPlugin([{ from: 'static' }]),
  ],
  module: {
    loaders: [{
      test: /\.(html)$/,
      loader: "file",
    }, {
      test: /.*\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-runtime', 'transform-class-properties'],
      },
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
};
