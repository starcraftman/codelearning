const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    user: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({'email': 'max@test.com'})
  .then(user => {
    req.session.user = user
    res.redirect('/')
  })
  .catch(err => console.log(err));
};