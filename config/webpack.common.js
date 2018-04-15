module.exports = env => {
  const webpack = require("webpack");
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const CleanWebpackPlugin = require("clean-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  const isDevelopment = env === "development";
  const packageJson = require("../package.json");
  const path = require("path");
  const distDir = {
    development: "./app/out",
    production: "./tmp/prod/app/out",
    test: "./tmp/test/app/out"
  }[env];

  const definePlugin = new webpack.DefinePlugin({
    "process.env.APP_VERSION": JSON.stringify(packageJson.version),
    "process.env.NODE_ENV": JSON.stringify(env)
  });

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
      plugins: [new ExtractTextPlugin({ filename: `${distDir}/app.css` }), definePlugin]
    },
    commonConfig
  );

  if (!isDevelopment) {
    const appDir = distDir.replace("/out", "");
    const root = path.resolve(__dirname, "..");
    const cleanPlugin = new CleanWebpackPlugin(appDir, { root });
    const copyPlugin = new CopyWebpackPlugin([
      { from: path.resolve(root, "app/index.html"), to: appDir },
      { from: path.resolve(root, "app/index.js"), to: appDir },
      { from: path.resolve(root, "package.json"), to: appDir },
      { from: path.resolve(root, "yarn.lock"), to: appDir }
    ]);
    rendererConfig.plugins.push(cleanPlugin, copyPlugin);
  }

  return [mainConfig, rendererConfig];
};
