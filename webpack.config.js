module.exports = {
    node: {
        fs: 'empty',
        lookup: 'empty',
        dgram: 'empty',
        server: true,
        utils: true,
        net: 'empty',
        dns: 'empty'
    },
    entry: './client/index.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'

            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};