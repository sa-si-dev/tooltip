const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const banner = `Tooltip 1.0
https://sa-si-dev.github.io/tooltip
Licensed under MIT (https://github.com/sa-si-dev/tooltip/blob/master/LICENSE)`;

module.exports = (env, options) => {
  const config = {
    entry: {
      styles: './src/styles.js',
      tooltip: './src/tooltip.js',
    },

    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: 'tooltip.min.css',
      }),

      new CleanWebpackPlugin({
        protectWebpackAssets: false,
        cleanAfterEveryBuildPatterns: ['main.min.js', 'styles.min.js'],
      }),

      new webpack.BannerPlugin(banner),

      new FileManagerPlugin({
        events: {
          onEnd: {
            copy: [{ source: 'dist', destination: 'docs/assets' }],
          },
        },
      }),
    ],

    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /(node_modules)/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };

  if (options.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  return config;
};
