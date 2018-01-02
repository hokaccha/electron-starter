const nodeExternals = require('webpack-node-externals');

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

module.exports = [mainConfig, rendererConfig];
