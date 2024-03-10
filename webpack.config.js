const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require("nodemon-webpack-plugin");

const outputDirectory = "dist";
const publicDirectory = "public";

module.exports = env => {
  return {
    entry: "./src/client/app.js",
    output:
      env === "prod"
        ? {
            // both filed served as static, outputDirectory is resolved first in server/index.js
            path: path.join(__dirname, publicDirectory),
            filename: "bundle.js"
          }
        : {
            path: path.join(__dirname, outputDirectory),
            filename: "bundle.js"
          },
    resolve: {
      extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader',
          options: {
            limit: '100000'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new NodemonPlugin({
        watch: ["./src", "./dist"],
        script: "./src/server/index.js",
        verbose: true,
        ignore: ["*.js.map"]
      })
    ]
  };
};
