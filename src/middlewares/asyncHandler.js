/**
 * Middleware used to wrap asynchronous operation from the API
 * and pass the error (if any) to the errorHandler middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = {
  asyncHandler,
};
