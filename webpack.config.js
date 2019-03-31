module.exports = {
    entry: [
        '@babel/polyfill',
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [ 'style-loader', 'css-loader']
              }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'main.bundle.js'
    },
    devServer: {
        contentBase: './dist',
        port: 3000,
        open: 'chrome'
    }
};