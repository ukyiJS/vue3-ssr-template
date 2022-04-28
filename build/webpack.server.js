const path = require('path');
const WebpackBar = require('webpackbar');
const WebpackNodeExternals = require('webpack-node-externals');
const common = require('webpack.common');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: !isProd && 'source-map',
  target: 'node',
  stats: 'minimal',
  entry: {
    app: './server/index.ts',
  },
  output: {
    path: path.join(process.cwd(), 'dist', 'server'),
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
