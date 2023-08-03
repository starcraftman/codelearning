const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let errorMsg = req.flash('error');
  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    user: false,
    errorMessage: errorMsg
  });
};

exports.getSignup = (req, res, next) => {
  let errorMsg = req.flash('error');
  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    user: false,
    errorMessage: errorMsg
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne({'email': req.body.email})
  .then(user => {
    if (!user) {
      req.flash('error', 'Invalid email or password')
      return res.redirect('/login');
    }

    bcrypt.compare(req.body.password, user.password)
      .then(doMatch => {
        if (doMatch) {
          req.session.user = user;
          return req.session.save(err => {
            if (err) { 
              console.log(err);
            }

            return res.redirect('/');
          })
        }
        
        req.flash('error', 'Invalid email or password')
        return res.redirect('/login')
      })
      .catch(err => console.log(err))
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

exports.postSignup = (req, res, next) => {
  // Sanity
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Missing email or password fields.')
    return res.redirect('/signup');
  }

  User.findOne({email: req.body.email})
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email already registered.')
        return res.redirect('/signup')
      }

      return bcrypt.hash(req.body.password, 12)
        .then(hashedPass => {
          if (req.body.password == req.body.confirmPassword) {
            const newUser = new User({
              email: req.body.email,
              password: hashedPass,
              cart: { items: [] },
            })
            return newUser.save();
          }
        }).then(result => {
          res.redirect('/login')
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
};