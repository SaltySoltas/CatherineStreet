const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ProvidePlugin} = require('webpack');

let babelOptions = {
  "presets": ["@babel/preset-react"],
  "plugins": [
      [
        "babel-plugin-import",
        {
          "libraryName": "@mui/material",
          "libraryDirectory": "",
          "camel2DashComponentName": false,
        },
        "core",
      ],
      [
        "babel-plugin-import",
        {
          "libraryName": "@mui/icons-material",
          "libraryDirectory": "",
          "camel2DashComponentName": false,
        },
        "icons",
      ],
      [
          "babel-plugin-direct-import",
          { "modules": ["@mui/material", "@mui/icons-material"] },
      ],
      "babel-plugin-lodash"
    ]
}

module.exports = {
    entry: "./src",
    output: {
        filename: "index.js"
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader',
                options: babelOptions
              },
              {
                loader: 'ts-loader'
              }
            ],
            include: path.join(__dirname, "src"),
            exclude: /node_modules/,
          },
        ],
      },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new ProvidePlugin({
        process: 'process/browser',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, "..", "node_modules", "openmoji", "color"),
            to: "openmoji"
          }
        ]
      }),
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