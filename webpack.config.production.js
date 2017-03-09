'use strict';

var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
      app:path.join(__dirname, '/src/app/index'),
    },
    output: {
      path: path.join(__dirname, '/dist/app/static/'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new CleanWebpackPlugin(["dist/app/static"]),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new CopyWebpackPlugin([
            { from: './src/app/css', to: './css/' },
          ])
    ],
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
      loaders: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          { test: /\.tsx?$/,
            loaders: ['react-hot','awesome-typescript'],
          }
      ],

      preLoaders: [
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          { test: /\.js$/, loader: "source-map-loader" },
      ],
    },
};
