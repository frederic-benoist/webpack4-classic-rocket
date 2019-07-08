/**
 * 2007-2019 Frédéric BENOIST
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License (AFL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://opensource.org/licenses/afl-3.0.php
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    Frédéric BENOIST
 * @copyright 2013-2019 Frédéric BENOIST <https://www.fbenoist.com/>
 * @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
 */

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// Fix main.js (https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151)
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const devMode = process.argv.indexOf('development') !== -1; // In development mode ?

let css_config = {
  entry: './css/theme.scss',
  output: {
    path: path.resolve(__dirname, '../../assets/css'),
  },
  devtool: devMode ? 'source-map' : '',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: { ident: 'postcss' }
          },
          {
            loader: 'sass-loader'
          }
          // Note that the loaders are ordered from bottom to top or right to left.
          // Loaders act like functions, that’s why it’s from right to left.
          // For example, css-loader(postcss-loader(sass-loader(resource)))
        ]
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../css/[hash].[ext]'
            }
          }
        ]
      },
    ]
  },
  optimization: {},
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: 'theme.css',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};

if (!devMode) {
  css_config.optimization.minimizer = [
    new OptimizeCSSAssetsPlugin()
  ];
}

module.exports = css_config;
