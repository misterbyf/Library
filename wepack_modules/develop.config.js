const path = require('path');
const entry = path.join(__dirname, '../src/index.js');
const outputPath = path.join(__dirname, '../dist');

module.exports = function developConfig() {
  return {
    entry: {
      index: ['@babel/polyfill', entry]
    },
    output: {
      path: outputPath,
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
};
