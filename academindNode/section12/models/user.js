const { getDb } = require('../util/database');
const mongodb = require('mongodb');

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart ? cart : {items: []};
    this._id = id ? new mongodb.ObjectId(id) : id;
  }

  cartTotal() {
    return this.getCart().then(cart => {
      return cart.
        map(item => item.price * item.quantity).
        reduce((x, y) => x + y, 0.0);
    })
    .catch(err => console.log(err));
  }

  save() {
    return getDb().collection('users')
      .insertOne(this)
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cartProd => {
      return "" + cartProd.productId === "" + product._id;
    });
    
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex == -1) {
      updatedCartItems.push({productId: product._id, quantity: 1})
    } else {
      updatedCartItems[cartProductIndex].quantity += 1;
    }

    return getDb().collection('users')
      .updateOne({_id: this._id}, {$set: {cart: {items: updatedCartItems}}})
      .catch(err => console.log(err));  
  }

  removeFromCart(productId) {
    productId = "" + productId;
    const updatedCartItems = this.cart.items.filter(item => item.productId + "" !== productId)

    return getDb().collection('users')
      .updateOne({_id: this._id}, {$set: {cart: {items: updatedCartItems}}})
      .catch(err => console.log(err));  
  }

  getCart() {
    const lookupProduct = {};
    this.cart.items.forEach((item) => lookupProduct["" + item.productId] = item.quantity)
    
    return getDb().collection('products')
      .find({_id: {$in: this.cart.items.map(x => x.productId)}})
      .toArray()
      .then(products => {
        return products.map(prod => {
          return {...prod, quantity: lookupProduct["" + prod._id]};
        })
      })
      .catch(err => console.log(err));  
  }

  addOrder() {
    const db = getDb();
    return this.getCart().then(products => {
      const order = {
        items: products,
        user: {
          _id: this._id,
          name: this.username,
          email: this.email
        },
        total: products
          .map(item => item.price * item.quantity)
          .reduce((x, y) => x + y, 0.0)
      
      }
      return db.collection('orders')
      .insertOne(order);
    })
    .then(result => {
      this.cart = {items: []};
      return db.collection('users')
      .updateOne(
        {_id: this._id}, 
        {$set: {cart: {items: []}}}
      )
    })
    .catch(err => console.log(err));  
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders')
      .find({'user._id': this._id})
      .toArray()
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