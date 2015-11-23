//based on https://github.com/christianalfoni/webpack-express-boilerplate
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import config from '../webpack.config.js';

const isProduction = process.env.NODE_ENV === 'production';
const DEVELOPMENT_PORT = 3000;
const port = isProduction ? process.env.PORT : DEVELOPMENT_PORT;
const app = express();

if (isProduction) {
  app.use(express.static(__dirname + '/dist'));

  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
} else {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    winston.log(err);
  }
  winston.info('Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
