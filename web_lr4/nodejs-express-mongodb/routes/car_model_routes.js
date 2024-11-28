const express = require('express');
const router = express.Router();
const carModelController = require('../controllers/car_model_controller.js');

router.get('/', carModelController.getAllCarModels);

router.get('/:id', carModelController.getCarModelById);

router.post('/', carModelController.createCarModel);

module.exports = router;