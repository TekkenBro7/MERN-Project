const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = '1337';
const { validationResult } = require('express-validator');



exports.register = async(req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();
        res.status(201).send("Пользователь зарегистрирован");
    } catch (error) {
        res.status(500).send("Ошибка при регистрации");
    }
}

exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send(`Пользователь ${username} не найден`);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Введен неверный пароль");
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        res.status(200).json({ message: "Вход выполнен успешно", token });
    } catch (error) {
        res.status(500).send("Ошибка при входе");
    }
};

exports.getUserInfo = async(req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    try {
        const decoded = jwt.verify(token, '1337');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        res.status(401).json({ error: 'Неверный токен' });
    }
};