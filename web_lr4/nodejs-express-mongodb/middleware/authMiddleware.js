const jwt = require('jsonwebtoken');
const User = require('../models/user.js'); // Путь к модели User
const secretKey = '1337';

const authenticateToken = async(req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Пользователь не существует. Выполните повторный вход." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Недействительный токен." });
    }
};

module.exports = authenticateToken;