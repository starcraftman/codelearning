const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const getSecret = require('../util/get-secret');
const JWT_SECRET = getSecret('jwt');

exports.putSignup = async (req, res, next) => {
  const errors = validationResult(req);
  
  try {
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, invalid post data.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const hashedPw = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      name: req.body.name,
      password: hashedPw,
      email: req.body.email,
    })
    await user.save()
    return res
      .status(201)
      .json({
        message: "User created!",
        userId: user._id
      })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
}

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({email: email});
    if (!user) {
      const error = new Error("A user with email was not found.");
      error.statusCode = 401;
      throw error;
    }

    console.log('loaded', user);
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Password incorrect.");
      error.statusCode = 401;
      throw error;
    }
  
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    )
    return res
      .status(200)
      .json({
        token: token,
        userId: user._id.toString()
      })

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  } 
}