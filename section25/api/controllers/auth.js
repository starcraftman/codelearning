const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.putSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, invalid post data.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  
  bcrypt.hash(req.body.password, 12)
    .then(hashedPw => {
      const user = new User({
        name: req.body.name,
        password: hashedPw,
        email: req.body.email,
      })
      return user.save()
    })
    .then(result => {
      res
        .status(201)
        .json({
          message: "User create!",
          userId: result._id
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
            next(err);
        }
    })
}