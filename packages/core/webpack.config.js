const { ProvidePlugin } = require('webpack')

module.exports = {
    entry: "./src/index.ts",
    devtool: 'inline-source-map',
    resolve:  {
        extensions:  ['.webpack.js',  '.web.js', '.json',  '.ts',  '.tsx',  '.js']
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: 'ts-loader',
              exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new ProvidePlugin({ Reflect: 'core-js/es7/reflect' })
    ],
    output: {
        path: __dirname,
        filename: "./dist/index.js",
        libraryTarget: "commonjs"
    }
};