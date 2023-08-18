const config = require('./config');
const { connectDB } = require('./database/connection');
const { accountRepository } = require('./repositories/example');
const loggerFactory = require('./logger');
const { isTesting, isDevelopment } = require('./environment');

const testApp = () => ({
  loggerFactory,
  accountRepository,
});

const devApp = () => {
  connectDB(config.DB_URL);

  return {
    loggerFactory,
    accountRepository,
  };
};

const prodApp = () => {
  connectDB(config.DB_URL);

  return {
    loggerFactory,
    accountRepository,
  };
};

const createApp = () => {
  if (isTesting()) {
    return testApp();
  }
  if (isDevelopment()) {
    return devApp();
  }
  return prodApp();
};

module.exports = { application: createApp() };
