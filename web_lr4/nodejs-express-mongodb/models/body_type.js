const mongoose = require('mongoose');

const bodyTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, maxlength: 100 },
    description: { type: String, default: '' }
}, { timestamps: true });

bodyTypeSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const BodyType = mongoose.model("BodyType", bodyTypeSchema);
module.exports = BodyType;