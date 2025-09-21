const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const customController = require('../controllers/customController');
const sedanController = require('../controllers/sedanController');
const inventoryController = require('../controllers/inventoryController');
const sportController = require('../controllers/sportController');
const suvController = require('../controllers/suvController');
const truckController = require('../controllers/truckController');

router.get('/', homeController.index);
router.get('/custom', customController.index);
router.get('/sedans', sedanController.index);
router.get('/sport', sportController.index);
router.get('/suv', suvController.index);
router.get('/truck', truckController.index);
router.get('/cars/:id', inventoryController.show);

module.exports = router;
