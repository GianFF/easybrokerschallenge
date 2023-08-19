const mongoose = require('mongoose');
const HTTPError = require('../../src/errors/httpError');
const { animalService } = require('../../src/services/animal');
const { application } = require('../../src/application');
const { connectDB, dropDB, dropCollections } = require('../connection');
const speakMethodConstants = require('../../src/domain/speakmethod/speakMethodConstants');

describe('Animal Service', () => {
  let specie, animalSound, name, speakMethod;
  beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await dropDB();
  });

  beforeEach(async () => {
    await dropCollections();
    specie = 'Cat';
    animalSound = 'miau';
    name = 'Kitten';
    speakMethod = speakMethodConstants.INTERSPERSED;
  });

  describe('save', () => {
    const subject = async () => {
      return animalService.save({
        animalRepository: application.animalRepository,
        logger: console,
        specie,
        animalSound,
        name,
        speakMethod,
      });
    };

    describe('when all parameters are given', () => {
      it('saves the animal in the DB', async () => {        
        const animal = await subject();

        expect(animal.id).not.toBeUndefined();
      });
    });

    describe('when at least one required parameter is not given', () => {
      it('throws an error', async () => {
        speakMethod = undefined;

        try {
          await subject();
        } catch(error) {
          expect(error instanceof HTTPError).toBeTruthy();
          expect(error.message).toBe('Oops! something failed, please try again later');
        }
      });
    });
  });

  describe('get', () => {
    let kittenID;
    let simbaID;
    let id;

    beforeEach(async () => {
      kittenID = (await application.animalRepository.save({ specie, animalSound, name, speakMethod }))._id;
      simbaID = (await application.animalRepository.save({
        specie: 'Lion',
        animalSound: 'grr',
        name: 'Simba',
        speakMethod: speakMethodConstants.INTERSPERSED,
      }))._id;
    });


    const subject = async () => {
      return animalService.get({
        animalRepository: application.animalRepository,
        logger: console,
        id,
      });
    };

    describe('if id is given', () => {
      it('finds the animal by id', async () => {
        id = kittenID;

        const animals = await subject();

        expect(animals.length).toBe(1);
        expect(animals[0].id).toBe(kittenID.toString());
      });

      it('returns an error if the animal does not exits', async () => {
        id = new mongoose.mongo.ObjectId();

        try {
          await subject()
        } catch(error) {
          expect(error instanceof HTTPError).toBeTruthy();
          expect(error.message).toBe('Animal not found');
        }
      });
    });
    
    describe('if NO id is given', () => {
      it('finds all the animals', async () => {
        id = undefined;

        const animals = await subject();

        expect(animals.length).toBe(2);
        expect(animals[0].id).toBe(kittenID.toString());
        expect(animals[1].id).toBe(simbaID.toString());
      });
    });
  });

  describe('speak', () => {
    let id;

    const subject = async () => {
      return animalService.speak({
        animalRepository: application.animalRepository,
        logger: console,
        id,
        phrase: 'Hello world',
      });
    };

    describe('when ID is given', () => {
      it('makes the animal say the phrase', async () => {
        id = (await application.animalRepository.save({ specie, animalSound, name, speakMethod }))._id;

        const phrase = await subject();

        expect(phrase).toBe('Hello miau world miau');
      });
    });

    describe('when ID is NOT given', () => {
      it('throws an error', async () => {
        id = undefined;

        try {
          await subject();
        } catch(error) {
          expect(error instanceof HTTPError).toBeTruthy();
          expect(error.message).toBe('id is required');
        }
      });
    });
  });
});