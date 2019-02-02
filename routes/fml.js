const router = require('koa-router')();
const moment = require('moment');
const fml = require('../lib/fml');

router.prefix('/api/v1');

router.get('/random', async (ctx) => {
  const data = await fml.random();

  ctx.body = {
    data: data.slice(0, 20),
  };
});

module.exports = router;
