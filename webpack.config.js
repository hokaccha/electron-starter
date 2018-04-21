const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const packageJson = require("./package.json");

module.exports = env => {
  const buildEnv = (env && env.BUILD_ENV) || "development";
  const isDevelopment = buildEnv === "development";
  const appDir = `./app/${buildEnv}`;
  const distDir = `${appDir}/out`;
  const copyTargetFiles = ["static/index.html", "static/index.js", "package.json", "yarn.lock"];

  const cleanPlugin = new CleanWebpackPlugin(appDir);
  const extractTextPlugin = new ExtractTextPlugin({ filename: `${distDir}/app.css` });
  const definePlugin = new webpack.DefinePlugin({
    "process.env.APP_VERSION": JSON.stringify(packageJson.version),
    "process.env.NODE_ENV": JSON.stringify(buildEnv)
  });
  const copyPlugin = new CopyWebpackPlugin(copyTargetFiles.map(filePath => ({ from: filePath, to: appDir })));

  const commonConfig = {
    resolve: { extensions: [".ts", ".tsx", ".js"] },
    devtool: "source-map",
    externals: {
      sqlite3: "commonjs sqlite3"
    },
    node: {
      __dirname: false,
      __filename: false
    }
  };

  const mainConfig = Object.assign(
    {
      target: "electron-main",
      entry: "./src/main/index.ts",
      output: { filename: `${distDir}/main.js` },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: isDevelopment }
          }
        ]
      }
    },
    commonConfig
  );

  const rendererConfig = Object.assign(
    {
      target: "electron-renderer",
      entry: "./src/renderer/app.tsx",
      output: { filename: `${distDir}/app.js` },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: isDevelopment }
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              loader: "css-loader",
              options: { sourceMap: true, import: false }
            })
          },
          {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: "url-loader"
          }
        ]
      },
      plugins: [extractTextPlugin, definePlugin, cleanPlugin, copyPlugin]
    },
    commonConfig
  );

  return [mainConfig, rendererConfig];
};
