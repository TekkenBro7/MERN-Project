const BodyType = require('../models/body_type.js');

exports.getAllBodyTypes = async(req, res) => {
    try {
        const bodyTypes = await BodyType.find({});
        res.status(200).json(bodyTypes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBodyTypeById = async(req, res) => {
    try {
        const bodyType = await BodyType.findById(req.params.id);
        if (!bodyType) {
            return res.status(404).json({ message: 'Body type not found' });
        }
        res.status(200).json(bodyType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBodyType = async(req, res) => {
    const { name, description } = req.body;
    const bodyType = new BodyType({ name, description });
    try {
        await bodyType.save();
        res.status(201).json(bodyType);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};