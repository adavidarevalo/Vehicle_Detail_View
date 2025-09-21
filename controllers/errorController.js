exports.trigger = (req, res, next) => {
  const err = new Error('Intentional test error (500)');
  err.status = 500;
  next(err);
};
