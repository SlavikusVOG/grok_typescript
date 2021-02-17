const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './public/clientapp.ts',
        plugins:[
            new HTMLWebpackPlugin(),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist/public'),
            filename: 'clientapp.bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.webpack.json',
                    },
                },
            ],
        },
    },
];