const inventoryModel = require('../models/inventory-model');

exports.index = async (req, res, next) => {
  try {
    const cars = await inventoryModel.getByImagePrefix('/images/truck-');
    res.render('custom', { title: 'Truck Gallery', cars });
  } catch (err) {
    next(err);
  }
};
