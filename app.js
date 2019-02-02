const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const json = require('koa-json');
const server = require('koa-static');
const load = require('./lib/load');
const middleware = require('./middleware');
const logger = require('./lib/logger');
const compress = require('koa-compress');
const koaSession = require('koa-session');
const config = require('./config');

const app = new Koa();

module.exports = app;

app.use(koaBody({
  // files: true,
  multipart: true,
  fields: true,
  formidable: { },
  text: true,
  formLimit: '100mb',
  jsonLimit: '100mb',
  textLimit: '100mb',
}));

app.proxy = true;

app.use(middleware.crossOrigin);
app.use(middleware.requestLogger);
app.use(compress());
app.use(middleware.errorHandler);

app.use(json());

load(app, `${__dirname}/routes`);

app.on('error', (err, ctx) => {
  logger.error(err);
});

process.on('uncaughtException', (err) => {
  logger.info('catch uncaughtException error');
  logger.error(err);
});
