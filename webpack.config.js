const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mainConfig = {
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: { filename: './dist/main.js' },
  resolve: { extensions: ['.ts', '.tsx'] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
};

const rendererConfig = {
  target: 'electron-renderer',
  entry: './src/renderer/app.tsx',
  output: { filename: './dist/app.js' },
  resolve: { extensions: ['.ts', '.tsx', '.css'] },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css?$/, use: ExtractTextPlugin.extract({ use: 'css-loader' }) },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: './dist/app.css' }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
};

module.exports = [mainConfig, rendererConfig];
