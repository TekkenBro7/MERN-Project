const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const connectDB = require("./config/db.config");

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const authenticateToken = require('./middleware/authMiddleware');

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const bodyTypeRoutes = require('./routes/body_type_routes.js');
const carModelRoutes = require('./routes/car_model_routes.js');
const carRoutes = require('./routes/car_routes.js');
const authRoutes = require('./routes/user_routes.js');
const vacancyRoutes = require('./routes/vacancy_routes.js');

const app = express();
connectDB();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(session({ secret: 'key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use('/api', authenticateToken);
app.use('/auth', authRoutes);
app.use('/api/body_types', bodyTypeRoutes);
app.use('/api/car_models', carModelRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/vacancies', vacancyRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Добро пожаловать в api сайта. Для использования войдите в систему." });

});

app.get('/api/check-token', authenticateToken, (req, res) => {
    res.sendStatus(200);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}.`);
});