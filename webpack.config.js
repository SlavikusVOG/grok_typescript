const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
    {
        mode: 'development',
        entry: './src/views/clientapp.ts',
        plugins:[
            new HTMLWebpackPlugin(),
            new CopyWebpackPlugin(
                {patterns: [
                    {
                        from: path.resolve(__dirname, 'libs/'),
                        to: path.resolve(__dirname, 'dist/libs/')
                    }
                ]}
            ),
        ],
        resolve: {
            extensions: ['.ts', '.js'],
            modules: ["./src/views", "node_modules", "./libs"]
        },
        output: {
            path: path.resolve(__dirname, 'dist/views'),
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