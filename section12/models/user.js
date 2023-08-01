const { getDb } = require('../util/database');
const mongodb = require('mongodb');

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart ? cart : {items: []};
    this._id = id ? new mongodb.ObjectId(id) : id;
  }

  subTotal() {
    return this.cart.items.reduce((left, right) => left + right, 0.0);
  }

  save() {
    return getDb().collection('users')
      .insertOne(this)
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const cartProduct = this.cart.items.find(cartProd => {
      return "" + cartProd.productId === "" + product._id;
    });
    console.log('final cartProduct', cartProduct)
    let updatedCart;

    if (!cartProduct) {
      updatedCart = {
        items: [...this.cart.items, {productId: product._id, quantity: 1}], 
      };
    } else {
      cartProduct.quantity += 1;
      updatedCart = {
        items: this.cart.items, 
      };
    }

    return getDb().collection('users')
    .updateOne({_id: this._id}, {$set: {cart: updatedCart}})
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
