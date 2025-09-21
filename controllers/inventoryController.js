const inventoryModel = require('../models/inventory-model');
const utils = require('../utilities');

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await inventoryModel.getById(id);
    if (!car) return res.status(404).render('404', { url: req.originalUrl });
    const detailHtml = utils.renderVehicleHtml(car);
    const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(car.price || 0);
    const formattedMileage = typeof car.mileage === 'number' ? new Intl.NumberFormat('en-US').format(car.mileage) : null;
    res.render('car', { title: car.custom_name || car.model, car, detailHtml, formattedPrice, formattedMileage });
  } catch (err) {
    next(err);
  }
};
