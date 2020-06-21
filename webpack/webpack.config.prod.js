const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const copyrightHeader = `
  Example Project - Video Studio.js
  Copyright (c) 2020 Tobias Briones <tobiasbriones.dev@gmail.com>. All rights reserved.
  Licensed under the MIT License. 
  
  Source code published at https://github.com/TobiasBriones/example.programming.video-processing.web.video-studio-js.
`;
const mode = 'production';
const plugins = [
  new webpack.BannerPlugin(copyrightHeader),
  new ScriptExtHtmlWebpackPlugin({
    module: /\.mjs$/,
    custom: [
      {
        test: /\.js$/,
        attribute: 'nomodule',
        value: '',
      },
    ],
  }),
  new FixStyleOnlyEntriesPlugin(),
  new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
  new OptimizeCSSAssetsPlugin({}),
];
const cssRules = {
  test: /\.css$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
      },
    },
    'css-loader',
  ],
};
const fileRules = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  exclude: /node_modules/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[contentHash].[ext]',
        outputPath: 'img',
      },
    },
  ],
};

const moduleConfig = {
  mode: mode,
  output: {
    filename: '[name].[contentHash].mjs',
  },
  plugins: plugins,
  module: {
    rules: [cssRules, fileRules],
  },
};

module.exports = [merge(commonConfig, moduleConfig)];
