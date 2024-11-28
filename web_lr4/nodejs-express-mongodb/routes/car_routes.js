const express = require('express');
const router = express.Router();
const carController = require('../controllers/car_controller.js');
const upload = require('../middleware/upload');
const { check } = require('express-validator');

const carValidationRules = [
    check('license_plate').notEmpty().withMessage('Номерной знак обязателен'),
    check('model').notEmpty().withMessage('Модель обязательна')
    .isMongoId().withMessage('Неверный формат ID модели'),
    check('body_type').notEmpty().withMessage('Тип кузова обязателен')
    .isMongoId().withMessage('Неверный формат ID кузова'),
    check('year').notEmpty().withMessage('Год обязателен')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Год должен быть в пределах от 1900 до текущего года'),
    check('car_cost').notEmpty().withMessage('Стоимость машины обязательна')
    .isFloat({ min: 0 }).withMessage('Стоимость должна быть положительным числом'),
    check('rental_cost_per_day').notEmpty().withMessage('Стоимость аренды обязательна')
    .isFloat({ min: 0 }).withMessage('Стоимость аренды должна быть положительным числом'),
];

router.post('/', upload.single('image'), carValidationRules, carController.createCar);

router.put('/:id', upload.single('image'), carValidationRules, carController.updateCar);

router.get('/', carController.getAllCars);

router.get('/:id', carController.getCarById);

// router.post('/', upload.single('image'), carController.createCar);

// router.put('/:id', upload.single('image'), carController.updateCar);

router.delete('/:id', carController.deleteCar);

module.exports = router;