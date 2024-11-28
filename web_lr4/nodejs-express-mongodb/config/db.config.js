let url = "mongodb://localhost:27017/webLr3MERN"
const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB подключено");
    } catch (error) {
        console.error("Ошибка подключения к MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;