var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

module.exports = {
    entry: "./app/App.js",
    output: {
        path: './public',
        filename: PROD ? 'bundle.min.js' : 'bundle.js'
    },
    module: {
        loaders: [ {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
                presets: [ 'react', 'es2015' ]
            }
        }, {
            test: /\.less$/,
            loader: "style!css!less?strictMath&noIeCompat"
        } ]
    },
     plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ] : []
}
