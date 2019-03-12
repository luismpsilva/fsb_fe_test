
const path = require('path');
const webpack = require('webpack');


module.exports = {
    entry: "./test/js/index.js",
    output: {
        filename: "bundle.js"
    },
    watch: true,
    plugins: [
        new webpack.ProvidePlugin({
            _: 'lodash',
            $ : 'jquery',
            Backone : 'backbone',
            Marionnette : 'backbone.marionette',
            io : 'socket.io-client'
        })
    ]
}