const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    entry: "./src/index.js",
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
         rules: [
             {
                 test: /\.(js|jsx)$/,
                 use: ["babel-loader"],
                 exclude: /node_modules/
             },
             {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
             }
         ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]

}