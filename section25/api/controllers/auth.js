const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const JWT_SECRET = 'somesupersecretsecret';

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
        }
        next(err);
    })
}

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.findOne({email: email})
  .then(userDoc => {
    if (!userDoc) {
      const error = new Error("A user with email was not found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = userDoc;
    console.log('loaded', loadedUser);
    return bcrypt.compare(password, userDoc.password);
  })
  .then(isEqual => {
    if (!isEqual) {
      const error = new Error("Password incorrect.");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString()
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    return res
      .status(200)
      .json({
        token: token,
        userId: loadedUser._id.toString()
      })
  })
  .catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
  })
}