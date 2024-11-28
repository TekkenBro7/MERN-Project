const mongoose = require('mongoose');

const vacancySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    payment: { type: String, required: true },
}, { timestamps: true });

vacancySchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Vacancy = mongoose.model("Vacancy", vacancySchema);
module.exports = Vacancy;