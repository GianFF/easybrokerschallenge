const express = require('express');
const { registerRoutesExample } = require('./example');

const initV1 = (application) => {
  const router = express.Router();
  registerRoutesExample(router, application);
  return router;
};

module.exports = { initV1 };
