const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

const srcPath = path.resolve(__dirname, 'src');
const dir = {
  js: `${srcPath}/scripts`,
  style: `${srcPath}/styles`,
  imgs: `${srcPath}/images`,
  pages: `${srcPath}/pages`,
};


function getPageNames(fileDir) {
  const filenames = fs.readdirSync(fileDir);
  return filenames;
}

function createHtmlPages() {
  const pages = getPageNames(dir.pages);
  const results = [];
  for (let i = 0; i < pages.length; i += 1) {
    const page = pages[i];
    const plugin = new HtmlWebpackPlugin({
      filename: page,
      template: path.join(dir.pages, page),
      // favicon: `${dir.imgs}/favicon.png`,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    });
    results.push(plugin);
  }
  return results;
}

const htmlPlugins = createHtmlPages();

module.exports = {
  entry: {
    index: [
      `${dir.js}/index.js`,
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
    }),
    ...htmlPlugins,
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
          },
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
};
