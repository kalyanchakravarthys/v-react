var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './index.js'],
    // ven
    resolve: {
        extensions: [
            '.webpack.js', '.web.js', '.jsx', '.js'
          ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};