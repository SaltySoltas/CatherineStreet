const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {ProvidePlugin} = require('webpack');
const openmoji = require('openmoji');
const ReactionIds = [
  0, // Grinning face
  6, // Rolling laughing face
  33, // Face with raised eyebrow
  80, // Crying face
  92, // Angry face
  270, // Thumbs up
  276, // thumbs down
  210, // Fingers crossed
  306, // Applause
  331, // Folded hands
  130, // Red heart
  3141, // Exclamation mark
  3138, // Question mark
  142, // Hundred
  155, // zzz
];

let emoji_patterns = [];
for(let reaction_id of ReactionIds){
  let hex = openmoji.openmojis[reaction_id].hexcode;
  emoji_patterns.push({
    from: path.join(__dirname, "..", "node_modules", "openmoji", "color", "svg", `${hex}.svg`),
    to: "openmoji"
  })
}

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
        patterns: emoji_patterns
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