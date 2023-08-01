const { MongoClient } = require('mongodb');

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://Dice:dicetest@dicedb.bzh9mch.mongodb.net/')
  .then(client => {
    console.log('Connected to dice db!');
    callback(client);
  })
  .catch(err => console.log(err));
}

module.exports = mongoConnect;
