module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name: 'API',
      script: './bin/www.js',
      watch: false,
      instances: process.env.INSTANCE || 1,
      exec_mode: 'cluster',
      kill_timeout: 20 * 1000,
      env: {
        PORT: process.env.PORT || 3000,
      },
      env_production : {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      }
    },
  ],
};
