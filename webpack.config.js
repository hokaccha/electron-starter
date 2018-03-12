module.exports = (env, argv) => {
  const webpack = require("webpack");
  const path = require("path");
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const mode = argv.mode === "production" ? "production" : "development";
  const isProduction = mode === "production";
  const distDir = path.resolve(__dirname, isProduction ? "./tmp/app/out" : "./app/out");
  const packageJson = require("./package.json");

  const definePlugin = new webpack.DefinePlugin({
    "process.env.APP_VERSION": JSON.stringify(packageJson.version),
    "process.env.NODE_ENV": JSON.stringify(mode)
  });

  const commonConfig = {
    mode: isProduction ? "production" : "development",
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
      output: { filename: "main.js", path: distDir },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: !isProduction }
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
      output: { filename: "app.js", path: distDir },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: !isProduction }
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
            loader: "url-loader"
          }
        ]
      },
      plugins: [new MiniCssExtractPlugin({ filename: "app.css" }), definePlugin]
    },
    commonConfig
  );

  return [mainConfig, rendererConfig];
};
