var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(__dirname, '/src/app/index'),
    ],
    output: {
        path: path.join(__dirname, 'dist/app/static/'),
        filename: 'bundle.js',
        publicPath: '/dist/app/static/',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new CopyWebpackPlugin([
            { from: './src/app/css', to: './css/' },
            { from: './src/app/fonts', to: './fonts/' }
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
          loaders: ['react-hot-loader', 'awesome-typescript-loader'],
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },
      ],
    },
    devServer: {
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
};
