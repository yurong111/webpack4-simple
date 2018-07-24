const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'dist'), // 静态资源路径
        /* proxy: {
            '/api': 'http://localhost:3001',
            // pathRewrite: {'^/api' : ''},
            changeOrigin: true,
            secure: false 
        } */
    }
};
