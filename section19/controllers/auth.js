const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator')

const User = require('../models/user');
const user = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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',
  }
}));

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
    errorMessage: errorMsg,
    oldInput: {
      email: req.body.email,
      password: req.body.password,
    },
    validationErrors: [],
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
    errorMessage: errorMsg,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationErrors: [],
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        user: false,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: req.body.email,
          password: req.body.password,
        },
        validationErrors: errors.array(),
      });
  }

  User.findOne({ 'email': req.body.email })
    .then(user => {
      if (!user) {
        return res
          .status(422)
          .render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            user: false,
            errorMessage: 'Invalid email or password', 
            oldInput: {
              email: req.body.email,
              password: req.body.password,
            },
            validationErrors: [{path: 'email'}, {path: 'password'}],
        });      
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
          return res
            .status(422)
            .render('auth/login', {
              path: '/login',
              pageTitle: 'Login',
              user: false,
              errorMessage: 'Invalid email or password', 
              oldInput: {
                email: req.body.email,
                password: req.body.password,
              },
              validationErrors: [{path: 'email'}, {path: 'password'}],
          });         })
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        user: false,
        errorMessage: errors.array()[0].msg,
        oldInput: {
          email: req.body.email,
          password: req.body.password,
          confirmPassword: req.body.confirmPassword
        },
        validationErrors: errors.array(),
      });
  }

  // Sanity
  if (!req.body.email || !req.body.password) {
    req.flash('error', 'Missing email or password fields.')
    return res.redirect('/signup');
  }

  return bcrypt.hash(req.body.password, 12)
    .then(hashedPass => {
      const newUser = new User({
        email: req.body.email,
        password: hashedPass,
        cart: { items: [] },
      })
      return newUser.save();
    }).then(result => {
      return res.redirect('/login')
      // Didn't complete the identity creation.
      // return transporter.sendMail({
      //   to: req.body.email,
      //   from: 'shop@node-complete.com',
      //   subject: 'signup success',
      //   html: '<h1>You signed up, welcome aboard.</h1>'
      // })
    })
    .catch(err => console.log(err))
};

exports.getReset = (req, res, next) => {
  let errorMsg = req.flash('error');
  if (errorMsg.length > 0) {
    errorMsg = errorMsg[0];
  } else {
    errorMsg = null;
  }

  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    path: '/reset',
    user: false,
    errorMessage: errorMsg
  });
}

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }

    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'Invalid email requested.')
          return res.redirect('/reset')
        }

        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600 * 1000;
        return user.save();
      })
      .then(result => {
        const mail = {
          to: req.body.email,
          from: 'shop@node-complete.com',
          subject: 'password reset',
          html: `<p>Requested password reset.</p>
            <p>Click this <a href="http://localhost:3000/new-password/${token}">link</a> to set a new password.
            `
        }
        console.log(mail);
        return res.redirect('/reset')
        // Didn't complete the identity creation.
        // return transporter.sendMail(mail);
      })
      .catch(err => console.log(err))
  })
}

exports.getNewPassword = (req, res, next) => {
  User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid reset password token. Request a new link!')
      }
      let errorMsg = req.flash('error');
      if (errorMsg.length > 0) {
        errorMsg = errorMsg[0];
      } else {
        errorMsg = null;
      }

      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        user: false,
        errorMessage: errorMsg,
        userId: user ? user._id.toString() : null,
        passwordToken: req.params.token
      });
    })
    .catch(err => console.log(err));
}

exports.postNewPassword = (req, res, next) => {
  console.log(req.body);
  User.findOne({
    resetToken: req.body.passwordToken,
    resetTokenExpiry: { $gt: new Date() },
    _id: req.body.userId
  })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid reset password token. Request a new link!')
      }

      return bcrypt.hash(req.body.password, 12)
        .then(hashedPass => {
          console.log(user);
          user.password = hashedPass;
          user.resetToken = null;
          user.resetTokenExpiry = null;
          return user.save();
        });
    })
    .then(result => {
      return res.redirect('/login')
    })
    .catch(err => console.log(err))

}