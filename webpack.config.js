const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

const devConfig = require('./wepack_modules/develop.config');
require('dotenv').config();

const common = {
  externals: [nodeExternals()],
  mode: 'development',
  target: 'node',
  devtool: 'inline-cheap-module-source-map',
  plugins: [
    new NodemonPlugin()
  ]
};

module.exports = () => {
  return merge([common, devConfig()]);
};
