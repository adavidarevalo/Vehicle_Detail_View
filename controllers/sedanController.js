const inventoryModel = require('../models/inventory-model');

exports.index = async (req, res, next) => {
  try {
    const cars = await inventoryModel.getByImagePrefix('/images/sedan-');
    res.render('custom', { title: 'Sedans Gallery', cars });
  } catch (err) {
    next(err);
  }
};
