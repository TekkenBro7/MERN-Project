const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

const secretKey = '1337'; // Ваш секретный ключ для JWT

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:8080/auth/google/callback',
    prompt: 'select_account'
}, async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
            user = new User({
                username: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                password: '',
                authProvider: profile.provider
            });
            await user.save();
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        done(null, { user, token });
    } catch (error) {
        done(error, null);
    }
}));

passport.use(new FacebookStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, async(accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ facebookId: profile.id });
        if (!user) {
            user = new User({
                username: profile.displayName,
                facebookId: profile.id,
                email: profile.emails ? profile.emails[0].value : null,
                password: '',
                authProvider: profile.provider
            });
            await user.save();
        }
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
        done(null, { user, token });
    } catch (error) {
        done(error, null);
    }
}));