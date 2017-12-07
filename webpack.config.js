module.exports = {
    node: {
       
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

            },
            {
                test: /\.css$/, loader: "style-loader!css-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json']
    }
};
