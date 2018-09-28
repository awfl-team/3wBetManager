const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const assetsSrc = path.resolve(__dirname, '../assets_src/');
module.exports  = function() {
    return {
        entry: {
            step1: [
                path.resolve(assetsSrc, 'step1/css/main.scss'),
                path.resolve(assetsSrc, 'step1/js/script.js'),
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.css', '.scss'],
        },
        output: {
            path:     path.resolve(assetsSrc, '../web'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test:    /\.jsx?$/,
                    exclude: /node_modules/,
                    use:     {
                        loader:  'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                },
                {
                    test: /\.scss|\.css/,
                    use:  ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use:      [
                            {
                                loader:  'css-loader',
                                options: { // CSS Nano configuration
                                    minimize: {
                                        discardComments:  { removeAll: true },
                                        core:             true,
                                        minifyFontValues: true
                                    }
                                }
                            },
                            'sass-loader'
                        ]
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].css')
        ],
        node: {
            net: 'empty',
            tls: 'empty',
            dns: 'empty'
        }
    };
};
