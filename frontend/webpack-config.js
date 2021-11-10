const { merge } = require('webpack-merge');
const common = require('./webpack-common.js');


module.exports = merge(common, {
    mode: "production",
    plugins: [
        new DefinePlugin({
            "process.env.PORT": JSON.stringify(process.env.PROD_PORT),
            "process.env.APP_DOMAIN": JSON.stringify(process.env.PROD_APP_DOMAIN)
        })
    ]
});