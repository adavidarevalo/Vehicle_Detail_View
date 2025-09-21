exports.trigger = (req, res, next) => {
  // intentionally throw an error to test error handling
  const err = new Error('Intentional test error (500)');
  err.status = 500;
  next(err);
};
