const CarModel = require('../models/car_model.js');

exports.getAllCarModels = async(req, res) => {
    try {
        const carModels = await CarModel.find({});
        res.status(200).json(carModels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarModelById = async(req, res) => {
    try {
        const carModel = await CarModel.findById(req.params.id);
        if (!carModel) {
            return res.status(404).json({ message: 'Car model not found' });
        }
        res.status(200).json(carModel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCarModel = async(req, res) => {
    const { brand, name } = req.body;
    const carModel = new CarModel({ brand, name });
    try {
        await carModel.save();
        res.status(201).json(carModel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};