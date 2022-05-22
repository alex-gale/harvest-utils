'use strict';

const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATHS = require('./paths');

const IMAGE_TYPES = /\.(png|jpe?g|gif|svg)$/i;

// Merge webpack configuration files
const config = (env, argv) => ({
  output: {
    // the build folder to output bundles and assets in.
    path: PATHS.build,
    // the filename template for entry chunks
    filename: '[name].js',
  },
  stats: {
    all: false,
    errors: true,
    builtAt: true,
    assets: true,
    excludeAssets: [IMAGE_TYPES],
  },
  module: {
    rules: [
      // Help webpack in understanding CSS files imported in .js files
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // Check for images imported in .js files and
      {
        test: IMAGE_TYPES,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Copy static assets from `public` folder to `build` folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'public',
        },
      ],
    }),
    // Extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    modules: [PATHS.src, 'node_modules']
  },
  entry: {
    index: PATHS.src + '/index.js',
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
})

module.exports = config;
