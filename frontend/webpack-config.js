const { EnvironmentPlugin, DefinePlugin } = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack-common.js');

require('dotenv').config();

module.exports = merge(common, {
    mode: "production",
    plugins: [
        new DefinePlugin({
            "process.env.PORT": JSON.stringify(process.env.PROD_APP_PORT),
            "process.env.APP_DOMAIN": JSON.stringify(process.env.PROD_APP_DOMAIN)
        })
    ]
});