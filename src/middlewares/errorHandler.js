const HTTPError = require('../errors/httpError');

/**
 * Middleware used to catch errors from the API
 */
const errorHandler = (error, req, res, next) => {
  if (error instanceof HTTPError) {
    req.logger.log(`Status code: ${error.statusCode} - ${error.stack}`);
    res.status(error.statusCode);
    res.json({
      message: error.message,
    });
  } else {
    next();
  }
};

module.exports = { errorHandler };
