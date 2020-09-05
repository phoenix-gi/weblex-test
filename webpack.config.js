const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + '/build',
        publicPath: 'build',
        filename: '[name].[contenthash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ title: 'Include scripts', template: 'src/php/index.php', filename: 'index.php' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/php' }
            ]
        })
    ]
};