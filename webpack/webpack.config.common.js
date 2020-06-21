const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const plugins = [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['main'],
  }),
];

module.exports = {
  entry: {
    main: './src/main.mjs',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: './',
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: ['html-loader'],
      },
    ],
  },
};
