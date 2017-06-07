const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let ROOT_PATH = path.resolve(__dirname);
let APP_PATH = path.resolve(ROOT_PATH, 'app');
let BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
    entry: path.resolve(APP_PATH, 'app.jsx'),
    output: {
        filename: 'bundle_[hash:5].js',
        path: BUILD_PATH
    },
    //开启dev source map
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: ROOT_PATH,
        hot: true,
        port: '9000',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader',
            ],
            include: APP_PATH
        }, {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }, {
            test: /\.(svg|eot|ttf|woff|woff2)$/,
            loader: 'file-loader?&name=[name]-[hash:base64:5].[ext]&outputPath=assets/fonts/',
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './app/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin({
            filename: 'index_[hash:5].css',
            disable: false,
            allChunks: true,
        })
    ]
};