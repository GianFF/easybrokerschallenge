const mongoose = require('mongoose');
const request = require('supertest');
const { connectDB, dropDB, dropCollections } = require('../../connection');
const { app } = require('../../../src/app');
const { application } = require('../../../src/application');
const speakMethodConstants = require('../../../src/domain/speakmethod/speakMethodConstants');
const { restoreMocks } = require('../../restoreMocks');

// Mock console.log to do nothing:
require('../../loggerMock');

describe('Animal API', () => {
  let specie, animalSound, name, speakMethod;

  beforeAll(async () => {
    await connectDB();
  });
  
  afterAll(async () => {
    await dropDB();
    restoreMocks();
  });

  beforeEach(async () => {
    await dropCollections();
    specie = 'Cat';
    animalSound = 'miau';
    name = 'Kitten';
    speakMethod = speakMethodConstants.INTERSPERSED;
  });

  describe('Create', () => {
    const subject = async () => {
      return request(app)
        .post('/v1/animal')
        .send({ specie, animalSound, name, speakMethod });
    };

    describe('when succeeds', () => {
      it('a new animal should be created and 200 with message returned', async () => {
        const response = await subject();
    
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('New animal created successfully!');
        expect(response.body.id).not.toBeUndefined();
      });
    });

    describe('when fails', () => {
      it('because of empty parameters returns 400 and message', async () => {
        specie = '';

        const response = await subject();
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('All parameters are required: specie, animalSound, name, speakMethod');
      });
    });
  });
 
  describe('Read', () => {
    const subject = async () => {
      return request(app)
        .get('/v1/animal')
        .send({ id });
    };

    describe('when succeeds', () => {
      describe('and an ID is provided', () => {
        it('the animal should be returned with HTTP status 200', async () => {
          const saved = await application.animalRepository.save({ specie, animalSound, name, speakMethod });
          id = saved.id;
        
          const response = await subject();
      
          expect(response.status).toBe(200);
          expect(response.body.animals).not.toBeUndefined();
          expect(response.body.animals.length).toBe(1);
        });
      });

      describe('and an ID is NOT provided', () => {
        it('all the animals should be returned with HTTP status 200', async () => {
          await application.animalRepository.save({ specie, animalSound, name, speakMethod });
          await application.animalRepository.save({
            specie: 'Lion',
            animalSound: 'grr',
            name: 'Simba',
            speakMethod: speakMethodConstants.INTERSPERSED,
          });
          id = '';
        
          const response = await subject();
      
          expect(response.status).toBe(200);
          expect(response.body.animals).not.toBeUndefined();
          expect(response.body.animals.length).toBe(2);
        });
      });
    });

    describe('when fails', () => {
      it('an error message should be returned with HTTP status 404', async () => {
        id = new mongoose.mongo.ObjectId();
      
        const response = await subject();
    
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Animal not found');
      });
    });
  });

  describe('Speak', () => {
    let phrase;

    const subject = async () => {
      return request(app)
        .get('/v1/animal/speak')
        .send({ id, phrase });
    };

    it('the animal returns the phrase with HTTP status 200', async () => {
      const saved = await application.animalRepository.save({ specie, animalSound, name, speakMethod });
      id = saved.id;
      phrase = 'Hello world';
    
      const response = await subject();
  
      expect(response.status).toBe(200);
      expect(response.body.phrase).toBe('Hello miau world miau');
    });
  });
});
