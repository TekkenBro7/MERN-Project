const mongoose = require('mongoose');

const CarModel = require('./car_model');
const BodyType = require('./body_type.js');

const carSchema = new mongoose.Schema({
    license_plate: { type: String, required: true, unique: true, maxlength: 10 },
    model: { type: mongoose.Schema.Types.ObjectId, ref: 'CarModel', required: true },
    body_type: { type: mongoose.Schema.Types.ObjectId, ref: 'BodyType', required: true },
    year: { type: Number, required: true },
    car_cost: { type: mongoose.Schema.Types.Decimal128, required: true },
    rental_cost_per_day: { type: mongoose.Schema.Types.Decimal128, required: true },
    image: { type: String, default: '' },
}, { timestamps: true });

carSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Car = mongoose.model("Car", carSchema);
module.exports = Car;