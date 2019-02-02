const needEnvs = [];
const processEnv = process.env;
const config = {
  PORT: processEnv.PORT,
  LOG_LEVEL: processEnv.LOG_LEVEL,
  // 运行环境的环境变量
  IS_TEST: processEnv.IS_TEST === 'true',
  IS_UNIT_TEST: processEnv.IS_UNIT_TEST === 'true',
};

for (const envName of needEnvs) {
  if (!processEnv[envName]) {
    console.error(`环境变量 ${envName} 缺失, 退出app`);
    process.exit(1);
  }
  config[envName] = processEnv[envName];
}

module.exports = config;
