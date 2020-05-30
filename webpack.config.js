const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
         rules: [
             {
                 test: /\.(js|jsx)$/,
                 use: ["babel-loader"],
                 exclude: /node_modules/
             }
         ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]

}