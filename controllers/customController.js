const inventoryModel = require('../models/inventory-model');

exports.index = async (req, res, next) => {
  try {
    const cars = await inventoryModel.getByImagePrefix('/images/custom-');
    res.render('custom', { title: 'Custom Gallery', cars });
  } catch (err) {
    next(err);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await inventoryModel.getById(id);
    if (!car) return res.status(404).render('404', { url: req.originalUrl });
    res.render('car', { title: car.custom_name || car.model, car });
  } catch (err) {
    next(err);
  }
};
