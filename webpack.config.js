'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: __dirname + '/public/main.js',
    output: {
        publicPath: '/',
        path: __dirname + '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                exclude: /(node_modules)/
            },
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime',
                                '@babel/plugin-transform-modules-commonjs']
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpg|jpeg|woff|woff2|eot|ttf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'public', 'static', 'img'),
                    to: path.resolve(__dirname, 'dist', 'static', 'img')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'main12.css'
        })
    ]
}
