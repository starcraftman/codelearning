const { getDb } = require('../util/database');
const mongodb = require('mongodb');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  save() {
    return getDb().collection('users')
      .insertOne(this)
      .catch(err => console.log(err));
  }

  static findById(userId) {
    return getDb().collection('users')
    .find({_id: new mongodb.ObjectId(userId) })
    .next()
    .catch(err => console.log(err))
  }
}

module.exports = User;
