const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonConfig = {
  resolve: { extensions: ['.ts', '.tsx'] },
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
};

const mainConfig = Object.assign({
  target: 'electron-main',
  entry: './src/main/index.ts',
  output: { filename: './dist/main.js' },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
}, commonConfig);

const rendererConfig = Object.assign({
  target: 'electron-renderer',
  entry: './src/renderer/app.tsx',
  output: { filename: './dist/app.js' },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader',
          options: { sourceMap: true },
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: './dist/app.css' }),
  ],
}, commonConfig);

module.exports = [mainConfig, rendererConfig];
