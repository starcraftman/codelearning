const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.put(
    '/signup',
    [
        body('email', 'Please enter a valid email')
            .normalizeEmail()
            .isEmail()
            .custom((value, { req }) => {
                return User
                    .findOne({email: value})
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject('Email already exists!');
                        }
                    })
            }),
        body('password')
            .trim()
            .isLength({min: 5}),
        body('name')
            .trim()
            .not().isEmpty()
    ],
    authController.putSignup
);

module.exports = router;