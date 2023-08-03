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
    req.session.save(err => {
      if (err) { 
        console.log(err);
      }
      res.redirect('/')
    });
  })
  .catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) { 
      console.log(err);
    }    
    res.redirect('/');
  });
};