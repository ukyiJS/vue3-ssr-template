const { merge } = require('webpack-merge');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');

const isProd = process.env.NODE_ENV === 'production';

let config = {
  entry: {
    app: './src/entry-client.ts',
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: 'null-loader',
      },
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'app-client',
      color: 'green',
    }),
    new Webpack.DefinePlugin({
      __VUE_PROD_DEVTOOLS__: !isProd,
      __VUE_HMR_RUNTIME__: !isProd,
      'process.env': JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks',
      fileBlacklist: [
        /\.(png|svg|jpe?g|json)$/,
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      maxSize: 300 * 1024,
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
    moduleIds: 'deterministic',
    runtimeChunk: true,
  },
};

if (process.env.ANALYZ_PORT) {
  config = merge(config, {
    plugins: [
      new BundleAnalyzerPlugin(),
    ],
  });
}

module.exports = () => merge([
  common,
  config,
]);
