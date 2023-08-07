const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf');
const connectFlash = require('connect-flash');
const multer = require('multer')
const sanitizeFile = require('sanitize-filename');

const errorController = require('./controllers/error');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const MONGODB_URI = 'mongodb+srv://Dice:dicetest@dicedb.bzh9mch.mongodb.net/shop'

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();
const multerStore = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, sanitizeFile(Date.now().toString() + '-' + file.originalname))
  }
})
const multerFilter = (req, file, cb) => {
  cb(
    null,
    ['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)
  );
}

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: multerStore, fileFilter: multerFilter}).single('image'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use(csrfProtection);
app.use(connectFlash())

app.use((req, res, next) => {
  req.app.locals.user = req.session.user;
  req.app.locals.csrfToken = req.csrfToken();
  next();
})

// When user was logged in via session, always query latest version.
// Alternative if document doesn't change User.hydrate(req.session.user);
app.use((req, res, next) => {
  if (req.session.user) {
    User.findOne({'_id': req.session.user._id})
    .then(user => {
      if (!user) {
        return next();
      }

      req.user = user
      return next();
    })
    .catch(err => {
      next(new Error(err));
    });
  } else {
    return next();
  }
});


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use('/500', errorController.get500);
app.use(errorController.get404);
app.use((err, req, res, next) => {
  console.log("ERROR HANDLER:\n", err);
  res.status(500).render('500', {
    pageTitle: 'Critical Error',
    path: '/500',
  });
});

mongoose
  .connect(MONGODB_URI + '?retryWrites=true', {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
