const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, default: '' },
    facebookId: { type: String, default: '' },
    authProvider: { type: String },
}, { timestamps: true });

userSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

// Шифруем пароль перед сохранением
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;