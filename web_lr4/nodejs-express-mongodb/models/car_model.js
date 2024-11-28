const mongoose = require('mongoose');

const carModelSchema = new mongoose.Schema({
    brand: { type: String, required: true, maxlength: 100 },
    name: { type: String, required: true, unique: true, maxlength: 100 }
}, { timestamps: true });

carModelSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const CarModel = mongoose.model("CarModel", carModelSchema);
module.exports = CarModel;