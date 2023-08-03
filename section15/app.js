const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)

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

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
  { secret: 'my secret', 
  resave: false, 
  saveUninitialized: false,
  store: store
}))

// When user was logged in via session, always query latest version.
// Alternative if document doesn't change User.hydrate(req.session.user);
app.use((req, res, next) => {
  if (req.session.user) {
    User.findOne({'_id': req.session.user._id})
    .then(user => {
      req.user = user
      return next();
    })
    .catch(err => console.log(err));
  } else {
    return next();
  }
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI + '?retryWrites=true', {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
