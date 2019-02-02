const logger = require('../lib/logger').label('middleware');

module.exports = {
  crossOrigin: async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept, X-Requested-With, x-api-token, x-captcha-id, x-captcha-token, x-admin-token, x-portal-token');
    ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    ctx.set('Access-Control-Max-Age', 60 * 60 * 24);
    ctx.set('Access-Control-Allow-Credentials', true);
    if (ctx.method.toUpperCase() === 'OPTIONS') {
      ctx.status = 204;
      return;
    }
    await next();
  },
  requestLogger: async (ctx, next) => {
    const start = new Date();
    logger.info(JSON.stringify(ctx.request.body));
    await next();
    const ms = new Date() - start;
    logger.info(`${ctx.method} ${ctx.response.status} ${ctx.url} -- ${ms}ms`);
    logger.info(JSON.stringify(ctx.request.body));
  },
  errorHandler: async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      logger.info('header: ', ctx.request.header);
      logger.info('body: ', ctx.request.body);
      logger.error(err);
    }
  }
};