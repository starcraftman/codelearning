const { MongoClient } = require('mongodb');
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://Dice:dicetest@dicedb.bzh9mch.mongodb.net/shop?retryWrites=true')
  .then(client => {
    console.log('Connected to dice db!');
    _db = client.db();
    callback(client);
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
}

const getDb =() => { 
  if (!_db) {
    throw 'No database connected.';
  }
  
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;