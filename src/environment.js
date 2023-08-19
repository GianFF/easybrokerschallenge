const config = require('./config');

const isTesting = () => config.NODE_ENV === 'test';

module.exports = {
  isTesting,
};
