const mongoose = require('mongoose');
const HTTPError = require('../errors/httpError');
const { animalFactory } = require('../domain/animal/animalFactory');

/**
 * AnimalService communicates repositories, domain and the API.
 */
const animalService = {
  async get({ animalRepository, logger, id }) {
    const animals = await animalRepository.findById(id);
    if (animals.length === 0) {
      logger.log(`Error: Couldn't find animal with ID: ${id}`);
      throw new HTTPError('Animal not found', 404);
    }
    return animals;
  },
  async save({
    animalRepository, logger, specie, animalSound, name, speakMethod,
  }) {
    try {
      const animal = await animalRepository.save({
        specie, animalSound, name, speakMethod,
      });
      return animal;
    } catch (error) {
      logger.log(`Error: trying to save animal with specie: ${specie}, animalSound: ${animalSound}, name: ${name}, speakMethod: ${speakMethod}`);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new HTTPError('All parameters are required: specie, animalSound, name, speakMethod', 400);
      }
      throw new HTTPError('Oops! something failed, please try again later', 500);
    }
  },
  async speak({
    animalRepository, logger, id, phrase,
  }) {
    if (!id) {
      logger.log('Error: Speak method called without ID');
      throw new HTTPError('id is required', 400);
    }
    const dbAnimal = await this.get({ animalRepository, logger, id });
    const animal = animalFactory.build(dbAnimal[0]);
    const thePhrase = animal.speak(phrase);
    logger.log(`thePhrase: ${thePhrase}`);
    return thePhrase;
  },
};

module.exports = { animalService };
