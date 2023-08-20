const config = require('./config');
const { connectDB } = require('./database/connection');
const { animalRepository } = require('./repositories/animal');
const { animalService } = require('./services/animal');
const loggerFactory = require('./logger');
const { isTesting } = require('./environment');

const testApp = () => ({
  loggerFactory,
  animalRepository,
  animalService,
});

const prodApp = () => {
  connectDB(config.DB_URL);
  return {
    loggerFactory,
    animalRepository,
    animalService,
  };
};

const createApp = () => (isTesting() ? testApp() : prodApp());

module.exports = { application: createApp() };
