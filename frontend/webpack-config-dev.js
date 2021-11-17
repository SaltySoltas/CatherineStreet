const { DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack-common.js');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

require('dotenv').config();

module.exports = merge(common, {
    mode: "development",
    watch: true,
    devtool: "inline-cheap-source-map",
    plugins: [
        new DefinePlugin({
            "process.env.PORT": JSON.stringify(process.env.DEV_PORT),
            "process.env.APP_DOMAIN": JSON.stringify(process.env.DEV_APP_DOMAIN)
        }),
        new BundleAnalyzerPlugin()
    ]
});