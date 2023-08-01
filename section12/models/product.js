const { getDb } = require('../util/database');
const mongodb = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : id;
    this.userId = userId;
  }

  save() {
    if (this._id) {
      return getDb().collection('products')
      .updateOne({_id: this._id}, {$set: this})
      .catch(err => console.log(err));
    } else {
      return getDb().collection('products')
        .insertOne(this)
        .catch(err => console.log(err));
    }
  }

  static findById(prodId) {
    console.log('findById', prodId);
    return getDb().collection('products')
    .find({_id: new mongodb.ObjectId(prodId) })
    .next()
    // .then(product => { 
    //   console.log(product);
    //   return product; 
    // })
    .catch(err => console.log(err))
  }

  static fetchAll() {
    return getDb().collection('products')
      .find()
      .toArray()
      // .then(products => { 
      //   console.log(products);
      //   return products; 
      // })
      .catch(err => console.log(err))
  }

  static deleteById(prodId) {
    return getDb().collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId) })
    .catch(err => console.log(err))
  }
}

module.exports = Product;