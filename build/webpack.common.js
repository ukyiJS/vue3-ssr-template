const isProd = process.env.NODE_ENV === 'production';
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { appConf } = require('../config');

const resolve = (...paths) => path.resolve(process.cwd(), ...paths);

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: !isProd && 'source-map',
  stats: 'minimal',
  output: {
    assetModuleFilename: `${appConf.assetsDir}/img/[name].[contenthash:8][ext][query]`,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              hotReload: !isProd,
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'swc-loader',
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
    },
    fallback: {
      fs: false,
      http: false,
      https: false,
    },
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
