const { getDb } = require('../util/database');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    return getDb().collection('products')
      .insertOne(this)
      // .then(result => {
      //   console.log(result);
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
}

module.exports = Product;