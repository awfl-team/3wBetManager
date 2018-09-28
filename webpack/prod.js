const webpack      = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function() {
    return webpackMerge(commonConfig(), {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: "'production'"
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                beautify: false,
                mangle: {
                    screw_ie8:   true,
                    keep_fnames: true
                },
                compress: {
                    screw_ie8: true,
                    warnings:  false
                },
                comments: false
            })
        ]
    })
};