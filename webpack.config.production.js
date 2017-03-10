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
      publicPath: '/dist/app/static/'
    },
    plugins: [
        new CleanWebpackPlugin(["dist/app/static"]),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new CopyWebpackPlugin([
            { from: './src/app/css', to: './css/' },
            { from: './src/app/fonts', to: './fonts/' },
          ])
    ],
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: ['awesome-typescript-loader'],
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
      ],
    },
};
