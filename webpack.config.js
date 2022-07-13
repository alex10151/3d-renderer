const path = require("path");
const webpack = require("webpack");
const htmlplugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {

                test: /\.(ts|tsx)?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "ts-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: { extensions: ["tsx", "ts", "*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        publicPath: "http://localhost:3000/dist/",
        hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new htmlplugin({ template: './public/index.html', filename: 'index.html' })]
};