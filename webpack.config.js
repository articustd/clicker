const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    mode: 'production',
    entry: './src/js/index.js',
    output: {
        filename: 'game.bundle.js'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components|story|vendor)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    resolve: {
        alias: {
            "@util": path.resolve(__dirname, 'src', 'js', 'controller', 'util'),
            "@controller": path.resolve(__dirname, 'src', 'js', 'controller'),
            "@GameEngine": path.resolve(__dirname, 'src', 'js', 'GameEngine'),
            "@js": path.resolve(__dirname, 'src', 'js')
        },
        extensions: ['.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Clicker Game",
            template: "template.html"
        }),
        new HtmlWebpackTagsPlugin({ tags: ['style.min.css'], append: true }) 
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
};