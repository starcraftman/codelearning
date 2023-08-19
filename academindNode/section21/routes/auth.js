const express = require('express');
const { check, body } = require('express-validator')

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login', 
    [
        body('email', 'Please enter a valid email.')
            .isEmail()
            .normalizeEmail(),
        body('password', 
            'Please enter a password with only numbers and characters, at least length 5.')
           .isLength({min: 5})
           .isAlphanumeric()
           .trim(),
    ],
    authController.postLogin
);

router.post(
    '/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email.')
            .custom((value, {req}) => {
                return User.findOne({email: req.body.email})
                .then(userDoc => {
                  if (userDoc) {
                    return Promise.reject('Email exists already, please pick a different one.')
                  }
                })
            })
            .normalizeEmail(),
        body('password', 
             'Please enter a password with only numbers and characters, at least length 5.')
            .isLength({min: 5})
            .isAlphanumeric()
            .trim(),
        body('confirmPassword', 'Passwords have to match!')
            .custom((value, {req}) => {
                return value === req.body.password
            })
            
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/new-password/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;