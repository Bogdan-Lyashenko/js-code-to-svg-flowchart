/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');

let libraryName = 'js2flowchart';

let plugins = [], outputFile;

outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [
        path.resolve('./node_modules'), path.resolve('./src'),
        path.resolve('./src/shared'), path.resolve('./src/render'),
        path.resolve('./src/builder'), path.resolve('./src/presentation-generator')
    ],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
