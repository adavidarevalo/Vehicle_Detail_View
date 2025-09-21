const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const customController = require('../controllers/customController');

router.get('/', homeController.index);
router.get('/custom', customController.index);
router.get('/cars/:id', customController.show);

module.exports = router;
