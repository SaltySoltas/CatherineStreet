const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin')

module.exports = {
    entry: "./src",
    output: {
        filename: "index.js"
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            include: path.join(__dirname, "src")
            // exclude: /node_modules/,
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      new FileManagerPlugin({
        events: {
          onEnd: [{
              copy: [
                  {
                      source: path.join(__dirname, 'dist'),
                      destination: path.join(__dirname, '../extensions/chrome/dist')
                  }
              ]
          }]
        }
    })
    ],
};