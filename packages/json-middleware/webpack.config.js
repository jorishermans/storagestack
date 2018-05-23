const { ProvidePlugin } = require('webpack')

module.exports = {
    entry: "./src/index.ts",
    devtool: 'inline-source-map',
    resolve:  {
        extensions:  ['.webpack.js',  '.web.js', '.json',  '.ts',  '.tsx',  '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
        ]
    },
    plugins: [
        new ProvidePlugin({ Reflect: 'core-js/es7/reflect' })
    ],
    output: {
        path: __dirname,
        filename: "index.js",
        libraryTarget: "umd"
    }
};