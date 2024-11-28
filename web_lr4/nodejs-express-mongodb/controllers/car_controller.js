const Car = require('../models/car.js');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

exports.getAllCars = async(req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarById = async(req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCar = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const carData = {
            license_plate: req.body.license_plate,
            model: new mongoose.Types.ObjectId(req.body.model),
            body_type: new mongoose.Types.ObjectId(req.body.body_type),
            year: req.body.year,
            car_cost: req.body.car_cost,
            rental_cost_per_day: req.body.rental_cost_per_day,
            image: req.file ? req.file.path : '', // Путь к изображению
        };

        const car = new Car(carData);
        await car.save();
        res.status(201).send({ message: 'Машина успешно добавлена', car });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

exports.updateCar = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        let updatedImagePath = car.image;
        if (req.file) {
            updatedImagePath = req.file.path;
            const oldImagePath = path.join(__dirname, '..', car.image);
            if (fs.existsSync(oldImagePath) && car.image) {
                fs.unlinkSync(oldImagePath);
            }
        }
        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id, {...req.body, image: updatedImagePath }, { new: true }
        );
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCar = async(req, res) => {
    const carId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(carId)) {
        return res.status(400).json({ message: 'Invalid car ID' });
    }
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const imagePath = path.join(__dirname, '..', car.image);
        if (fs.existsSync(imagePath) && car.image) {
            return res.status(400).json({ message: imagePath });
            fs.unlinkSync(imagePath);
        }
        await Car.findByIdAndDelete(carId);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};