const config = require('./config');
const { connectDB } = require('./database/connection');
const { animalRepository } = require('./repositories/animal');
const { animalService } = require('./services/animal');
const loggerFactory = require('./logger');

/**
 * This is the application object, it holds the logic the
 * application needs to run in each different environment
 * and also all the needed objects for the app to run.
 */
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

const createApp = () => (config.NODE_ENV === 'test' ? testApp() : prodApp());

module.exports = { application: createApp() };
