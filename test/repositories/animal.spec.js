const mongoose = require('mongoose');
const { animalRepository } = require('../../src/repositories/animal');
const { application } = require('../../src/application');
const { connectDB, dropDB, dropCollections } = require('../connection');
const speakMethodConstants = require('../../src/domain/speakmethod/speakMethodConstants');

describe('Animal Repository', () => {
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
      return animalRepository.save({ specie, animalSound, name, speakMethod });
    };

    test('saves an animal', async () => {
      const animal = await subject();

      expect(animal.id).not.toBeUndefined();
    });

    test('throws an error if required params are not there', async () => {
      specie = undefined;

      try {
        await subject();
      } catch(error) {
        expect(error instanceof Error).toBeTruthy();
      }
    });
  });

  describe('findById', () => {
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
      return animalRepository.findById(id);
    };

    describe('if NO id is given', () => {
      test('returns all animals', async () => { 
        const animals = await subject();

        expect(animals.length).toBe(2);
        expect(animals[0].id).toEqual(kittenID.toString());
        expect(animals[1].id).toEqual(simbaID.toString());
      });
    });

    describe('if id is given', () => {
      test('returns that animal', async () => {
        id = kittenID;

        const animals = await subject();

        expect(animals.length).toBe(1);
        expect(animals[0].id).toEqual(kittenID.toString());
      });
    });

    describe('if id is not found', () => {
      test('does not returns any animal', async () => {
        id = new mongoose.mongo.ObjectId();

        const animals = await subject();

        expect(animals.length).toBe(0);
      });
    });
  });
});