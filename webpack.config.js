// node modules
const { merge } = require("webpack-merge");
const path = require("path");
const pkg = require("./package.json");
const git = require("git-rev-sync");

// utils
const mapModules = require("./src/utils/mapModules");

// webpack plugins
const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// others
const date = new Date();
const modules = mapModules(path.join(__dirname, "src/modules/**/entries.js"));

const common = {
  entry: modules.reduce((entries, module) => {
    entries[module.key] = path.resolve(__dirname, module.entry);
    return entries;
  }, {}),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]/main.[contenthash:5].js",
    clean: true,
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
    new WebpackNotifierPlugin({
      title: "Webpack",
      excludeWarnings: true,
      alwaysNotify: true,
    }),
    ...modules.map((module) => {
      return new HtmlWebpackPlugin({
        title: module.meta.title,
        filename: `${module.key}/index.html`,
        template: path.join(__dirname, `src/modules/${module.key}/index.html`),
        chunks: [module.key],
        meta: {
          viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
          ...module.meta,
        },
        inject: "body",
      });
    }),
  ],
};

const dev = {
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  output: {
    publicPath: "/dist",
  },
  cache: {
    type: "memory",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "styleTag" },
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    public: "/",
    host: "0.0.0.0",
    port: process.env.DEVSERVER_PORT || 3001,
    serveIndex: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};

const prod = {
  mode: "production",
  output: {
    publicPath: process.env.LIVE_URL || "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              url: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ["default"],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]/main.[contenthash:5].css",
      chunkFilename: "[id].css",
    }),
    new webpack.BannerPlugin({
      banner: [
        "/*!",
        ` * @project ${pkg.name}`,
        ` * @build ${date.toUTCString()}`,
        ` * @release ${git.branch()}-${git.short()}`,
        ` * @copyright Copyright (c) ${date.getFullYear()} - ${pkg.author}`,
        " */",
        "",
      ].join("\n"),
      raw: true,
    }),
  ],
};

module.exports = (env, args) => {
  switch (args.mode) {
    case "development":
      return merge(common, dev);
    default:
      return merge(common, prod);
  }
};
