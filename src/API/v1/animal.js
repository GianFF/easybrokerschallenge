const { asyncHandler } = require('../../middlewares/asyncHandler');

const registerAnimalRoutes = (router, application) => {
  router.get('/animal', asyncHandler(async (req, res) => {
    req.logger.log('GET v1/animal');

    const { id } = req.body;
    const animals = await application.animalService.get({
      animalRepository: application.animalRepository,
      logger: req.logger,
      id,
    });

    return res
      .status(200)
      .send({ animals });
  }));

  router.post('/animal', asyncHandler(async (req, res) => {
    req.logger.log('POST v1/animal');

    const {
      specie, animalSound, name, speakMethod,
    } = req.body;
    const animal = await application.animalService.save({
      animalRepository: application.animalRepository,
      logger: req.logger,
      specie,
      animalSound,
      name,
      speakMethod,
    });

    return res
      .status(200)
      .send({ message: 'New animal created successfully!', id: animal.id.toString() });
  }));

  router.get('/animal/speak', asyncHandler(async (req, res) => {
    req.logger.log('GET v1/animail/speak');

    const { id, phrase } = req.body;
    const thePhrase = await application.animalService.speak({
      animalRepository: application.animalRepository,
      logger: req.logger,
      id,
      phrase,
    });

    return res
      .status(200)
      .send({ phrase: thePhrase });
  }));
};

module.exports = { registerAnimalRoutes };
