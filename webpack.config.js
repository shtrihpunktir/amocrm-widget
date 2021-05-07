
const CopyPlugin = require("copy-webpack-plugin");
var ZipPlugin = require('zip-webpack-plugin');

// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const outPath = path.resolve(__dirname, 'dist');
module.exports = {
    mode: 'production',
    // devtool: 'source-map',
    entry: {
        script: './src/index.js'
    },
    output: {
        clean: true,
        iife: false,
        path: outPath,
        scriptType: "text/javascript",
        library: {
            // name: 'ShtrihWidget',
            type: 'amd'
        }
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        // Add your plugins here
        // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
        new CopyPlugin({
            patterns: [
                { from: "assets", to: "" },
            ],
        }),
        new ZipPlugin({
            filename: 'widget.zip',
        })
    ],
    module: {
        rules: [
            {
                test: /\\.(js|jsx)$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    // optimization: {
    //     minimize: false,
    // },

};
