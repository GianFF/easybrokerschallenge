const { asyncHandler } = require('../../middlewares/asyncHandler');

const registerRoutesExample = (router, application) => {
  router.get('/', asyncHandler(async (req, res) => {
    req.logger.log(`GET v1/ with ${application}`);

    return res
      .status(200)
      .send({
        message: 'hi there!',
      });
  }));
};

module.exports = { registerRoutesExample };
