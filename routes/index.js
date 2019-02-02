const router = require('koa-router')();
const moment = require('moment');

router.get('/', async (ctx) => {
  ctx.body = `Welcome to FML service, at ${moment()}, 👏👏👏`;
});

router.get('/ping', async (ctx) => {
  ctx.body = 'OK, 👍😄';
});

module.exports = router;
