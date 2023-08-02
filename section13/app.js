const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findOne({'email': 'max@test.com'}).then(user => {
    if (!user) {
      user = new User({
        name: 'Max',
        email: 'max@test.com',
        cart: {
          items: [],
        }
      })
      user.save();
    } 
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoose
  .connect(
    'mongodb+srv://Dice:dicetest@dicedb.bzh9mch.mongodb.net/shop?retryWrites=true',
    {useNewUrlParser: true, useUnifiedTopology: true}
    )
  .then((result) => {
    // console.log(result)
    console.log('Mongoose connected.');
    app.listen(3000);
  })
  .catch(err => console.log(err))