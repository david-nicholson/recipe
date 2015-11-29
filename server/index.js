//based on https://github.com/christianalfoni/webpack-express-boilerplate
import path from 'path';
import express from 'express';
import fs from 'fs';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import config from '../webpack.config.js';

const isProduction = process.env.NODE_ENV === 'production';
const DEVELOPMENT_PORT = 3000;
const port = isProduction ? process.env.PORT : DEVELOPMENT_PORT;
const app = express();

/*
* A very, very simple server for now that mimicks an external API for demo purposes. Would be standalone API.
*/
function getJSONFile(filePath) {
  return fs.readFileSync(path.join(__dirname, filePath), 'utf8');
}

app.get('/data/recipes', (req, res) => {
  const data = getJSONFile('/data/list.json');
  res.json(JSON.parse(data));
});

app.get('/data/recipes/:name', (req, res) => {
  const data = getJSONFile(`/data/${req.params.name}.json`);
  res.json(JSON.parse(data));
});

/*
*
*/

if (isProduction) {
  app.use(express.static(__dirname + '/dist'));

  app.get('*', (req, res) => {
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

  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    winston.log(err);
  }
  winston.info('Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
