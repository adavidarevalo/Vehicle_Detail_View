const inventoryModel = require('../models/inventory-model');

exports.index = async (req, res, next) => {
  try {
    const cars = await inventoryModel.getByImagePrefix('/images/suv-');
    res.render('custom', { title: 'SUV Gallery', cars });
  } catch (err) {
    next(err);
  }
};
