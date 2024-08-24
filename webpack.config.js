const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    // Входящая точка в приложение
    // https://webpack.js.org/configuration/entry-context/#entry
    entry: './main.tsx',
    // Определяет контекст сборки, основную директорию, абсолютный путь для входящей точки (entry)
    // https://webpack.js.org/configuration/entry-context/#context
    context: resolve(__dirname, 'src'),
    // Определяет директорию в которую помещаются файлы сборки
    output: {
        // путь до директории с файлами сборки
        // https://webpack.js.org/configuration/output/#outputpath
        path: resolve(__dirname, 'build'),
        // очищать директорию от предыдущих сборок
        // https://webpack.js.org/configuration/output/#outputclean
        clean: true,
        // https://webpack.js.org/configuration/output/#outputfilename
        filename: "[name].[contenthash].js"
    },
    resolve: {
        // Подключаем jsx, ts, tsx расширения, чтобы можно было делать import модеулей
        // https://webpack.js.org/configuration/resolve/#resolveextensions
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // Настройка модулей
    // https://webpack.js.org/configuration/module/
    module: {
        // Настраиваем правила для лоадеров
        rules: [
            {
                // регулярное выражение для поиска js, jsx, ts, tsx
                test: /\.(js|ts)x?$/,
                // используем лоадер babel-loader
                use: ['babel-loader'],
                // исключаем попадание node_modules в лоадер
                // https://webpack.js.org/loaders/babel-loader/#babel-loader-is-slow
                exclude: /node_modules/
            },

            // Встроенный модуль Asset Modules позволяет работать с статическими файлами без
            // дополнтиельных модулей
            // https://webpack.js.org/guides/asset-modules/
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            }
        ]
    },
    // Опция служит для изменения сборки используя систему плагинов.
    // https://webpack.js.org/configuration/plugins/
    plugins: [
        // Создаёт файл index.html в output директории на основе созданного шаблона.
        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({template: 'index.html'}),

        // Плагин Webpack, который запускает проверку типов TypeScript в отдельном процессе.
        // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: resolve(__dirname, 'tsconfig.json')
            }
        })
    ]
}