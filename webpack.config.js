/* global __dirname, require, module*/

const path = require('path');

let libraryName = 'js2flowchart';

let outputFile;

outputFile = libraryName + '.js';

const config = {
  entry: __dirname + '/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "(typeof window !== 'undefined' ? window : this)"
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
  mode: process.env.NODE_ENV || 'development'
};

module.exports = config;
