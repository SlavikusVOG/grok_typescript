const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = [
    {
        mode: 'development',
        entry: './app/app.ts',
        target: 'node',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
          path: path.resolve(__dirname, 'dist/app'),
          filename: 'app.bundle.js',
        },
        module: {
            rules: [
                {
                    test:/\.ts$/,
                    use: [
                        'ts-loader',
                    ],
                },
            ],
        },
        externals: [ webpackNodeExternals() ]
    },
    {
        mode: 'development',
        entry: './public/clientapp.ts',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist/public'),
            filename: 'clientapp.js',
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: [
                        'ts-loader',
                    ],
                },
            ],
        },
    },
];