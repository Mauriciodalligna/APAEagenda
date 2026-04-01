const { getSequelizeCliConfig } = require('./db-connection.cjs');

const common = getSequelizeCliConfig();

module.exports = {
  development: common,
  test: common,
  production: common,
};
