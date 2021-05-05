'use strict';
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './public/'),
    dist: path.resolve(__dirname, './dist/')
};

module.exports = {
    resolve: {
        alias: {
            Controllers: path.resolve(__dirname, 'public/controllers/'),
            Components: path.resolve(__dirname, 'public/components/'),
            Events: path.resolve(__dirname, 'public/events/'),
            Models: path.resolve(__dirname, 'public/models/'),
            Modules: path.resolve(__dirname, 'public/modules/'),
            Views: path.resolve(__dirname, 'public/views/'),
        },
    },

    entry: {
        main: path.join(PATHS.src, 'main.js'),
        serviceWorker: path.join(PATHS.src, 'serviceWorker.js')
    },

    output: {
        publicPath: '/',
        path: PATHS.dist,
        filename: '[name].js'
    },
    devServer: {
        stats: {
            children: false,
            maxModules: 0
        },
        port: 3000, // Specify a port number to listen for requests
        contentBase: PATHS.dist,
        historyApiFallback: true,
        compress: false
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
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-transform-modules-commonjs',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-private-methods'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader']
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
            filename: 'main.css'
        })
    ]
}
