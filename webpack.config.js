// node modules
const { merge } = require("webpack-merge");
const path = require("path");
const pkg = require("./package.json");
const git = require('git-rev-sync');

// utils
const configureEntries = require("./src/utils/configureEntries");

// webpack plugins
const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");
const TerserPlugin = require('terser-webpack-plugin');

// others
const date = new Date();

const common = merge({
  name: "",
  entry: configureEntries(path.join(__dirname, "src/modules", "**/entries.js")),
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name].[contenthash:5].bundle.js",
    clean: true,
  },
  module: {
    rules: [],
  },
  plugins: [
    new WebpackNotifierPlugin({
      title: "Webpack",
      excludeWarnings: true,
      alwaysNotify: true,
    }),
  ],
});

const dev = merge(common, {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  cache: {
    type: "memory",
  },
  devServer: {
    public:
      process.env.DEVSERVER_PUBLIC ||
      `http://localhost:${process.env.DEVSERVER_PORT || 3001}`,
    host: process.env.DEVSERVER_HOST || "0.0.0.0",
    port: process.env.DEVSERVER_PORT || 3001,
    serveIndex: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

const prod = merge(common, {
  output: {
    publicPath: process.env.LIVE_URL + "/" || "/",
    filename: "[name].[chunkhash:5].bundle.js",
    clean: true,
  },
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
        banner: [
            '/*!',
            ` * @project ${pkg.name}`,
            ` * @build ${date.toUTCString()}`,
            ` * @release ${git.branch()}-${git.short()}`,
            ` * @copyright Copyright (c) ${date.getFullYear()} - ${pkg.author
            }`,
            ' */',
            ''
        ].join('\n'),
        raw: true
    }),
  ],
});

module.exports = (env, argv) => (argv.mode === "development" ? dev : prod);
