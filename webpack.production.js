const { merge } = require("webpack-merge");
const config = require('./webpack.config');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
    // Установка режима сборки для использовани встроеных в webpack отпимизаций результирующего bundle.
    // https://webpack.js.org/configuration/mode/
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ],  // порядок имеет значение!
                exclude: /\.module\.css$/,
            },
            {
                test: /\.module\.css$/,
                use: [
                    // https://webpack.js.org/plugins/mini-css-extract-plugin/
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            }
                        }
                    },
                    'postcss-loader'
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ]
})