const express = require('express');
const { registerAnimalRoutes } = require('./animal');

const initV1 = (application) => {
  const router = express.Router();
  registerAnimalRoutes(router, application);
  return router;
};

module.exports = { initV1 };
