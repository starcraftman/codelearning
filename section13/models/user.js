const mongoose = require('mongoose');

//   addOrder() {
//     const db = getDb();
//     return this.getCart().then(products => {
//       const order = {
//         items: products,
//         user: {
//           _id: this._id,
//           name: this.username,
//           email: this.email
//         },
//         total: products
//           .map(item => item.price * item.quantity)
//           .reduce((x, y) => x + y, 0.0)
      
//       }
//       return db.collection('orders')
//       .insertOne(order);
//     })
//     .then(result => {
//       this.cart = {items: []};
//       return db.collection('users')
//       .updateOne(
//         {_id: this._id}, 
//         {$set: {cart: {items: []}}}
//       )
//     })
//     .catch(err => console.log(err));  
//   }

//   getOrders() {
//     const db = getDb();
//     return db.collection('orders')
//       .find({'user._id': this._id})
//       .toArray()
//       .catch(err => console.log(err));  
//   }

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true
      }
    }]
  }
});

userSchema.methods.addToCart = function(product) {
  const updatedCartItems = [...this.cart.items];
  const cartProductIndex = updatedCartItems.findIndex(cartProd => {
    return "" + cartProd.productId === "" + product._id;
  });
  
  if (cartProductIndex == -1) {
    updatedCartItems.push({productId: product._id, quantity: 1})
  } else {
    updatedCartItems[cartProductIndex].quantity += 1;
  }

  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.removeFromCart = function(productId) {
  productId = "" + productId;
  const updatedCartItems = this.cart.items.filter(item => item.productId + "" !== productId);
  this.cart.items = updatedCartItems;
  return this.save();
}

userSchema.methods.cartTotal = function() {
  this
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      return user.cart.items
        .map(item => item.productId.price * item.quantity)
        .reduce((x, y) => x + y, 0.0);
  })
  .then(result => {
    console.log(result);
    return result;
  })
  .catch(err => console.log(err));
}
module.exports = mongoose.model('User', userSchema);