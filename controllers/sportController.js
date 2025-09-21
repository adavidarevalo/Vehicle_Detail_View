const inventoryModel = require('../models/inventory-model');

exports.index = async (req, res, next) => {
  try {
    const cars = await inventoryModel.getByImagePrefix('/images/sport-');
    res.render('custom', { title: 'Sport Gallery', cars });
  } catch (err) {
    next(err);
  }
};
