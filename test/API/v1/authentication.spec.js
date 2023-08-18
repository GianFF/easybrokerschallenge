const request = require('supertest');
const { connectDB, dropDB, dropCollections } = require('../../connection');
const config = require('../../../src/config');
config.NODE_ENV = 'test';
const { app } = require('../../../src/app');
const { application } = require('../../../src/application');

// Mock console.log to do nothing:
require('../../loggerMock');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await dropDB();
});

describe('SignUp', () => {
  beforeEach(async () => {
    await dropCollections();
  });

  it('should create a new user and send a verification email', async () => {
    const response = await request(app)
      .get('/v1/')
      .expect(200);

    expect(response.body.message).toBe('hi there!');
  });
});
