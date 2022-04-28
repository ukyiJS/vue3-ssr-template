const path = require('path');
const WebpackBar = require('webpackbar');
const WebpackNodeExternals = require('webpack-node-externals');
const common = require('./webpack.common');

module.exports = {
  mode: common.mode,
  devtool: common.devtool,
  target: 'node',
  stats: common.stats,
  entry: {
    app: './server/index.ts',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist/server'),
    filename: 'index.js',
  },
  externals: WebpackNodeExternals(),
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
    alias: common.resolve.alias,
  },
  plugins: [
    new WebpackBar({ name: 'server', color: 'cyan' }),
  ],
};
