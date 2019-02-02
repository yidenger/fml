const env = require('./env');

module.exports = {
  env,
  log: {
    level: env.LOG_LEVEL || 'debug',
  },

  paging: {
    limit: 20,
  },
};

