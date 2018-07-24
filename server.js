const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
var proxy = require('http-proxy-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

var exampleProxy = proxy('/api', {target: 'http://localhost:3001', changeOrigin: true});
app.use('/api', exampleProxy);

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: __dirname+'/dist' });
})

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});