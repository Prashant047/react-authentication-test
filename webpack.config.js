const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query:{
                    presets: ['es2015','react','stage-2'],
                    plugins: ['react-html-attrs','transform-class-properties']
                }
            }
        ]
    },
    devtool: 'source-map'
};