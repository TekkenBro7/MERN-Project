const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller.js');
const passport = require('passport');
require('../controllers/passport_setup.js');
const { check } = require('express-validator');

router.post('/register', [
    check('username').notEmpty().withMessage('Имя обязательно'),
    check('email').isEmail().withMessage('Неправильная почта'),
    check('password').isLength({ min: 4, max: 12 }).withMessage('Пароль должен быть в пределах от 4 до 12 символов')
], userController.register);

// router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.token;
        res.redirect(`http://localhost:3000?token=${token}`);
    }
);

router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.token;
        res.redirect(`http://localhost:3000?token=${token}`);
    });

router.get('/user-info', userController.getUserInfo);

module.exports = router;