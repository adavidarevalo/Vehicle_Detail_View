const inventoryModel = require('../models/inventory-model');
const utils = require('../utilities');

exports.show = (req, res, next) => {
  try {
    const id = req.params.id;
    const car = inventoryModel.getById(id);
    if (!car) return res.status(404).render('404', { url: req.originalUrl });
    // Provide a rendered HTML snippet via utility as required by assignment
    const detailHtml = utils.renderVehicleHtml(car);
    res.render('car', { title: car.custom_name || car.model, car, detailHtml });
  } catch (err) {
    next(err);
  }
};
