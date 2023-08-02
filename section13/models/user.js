const mongoose = require('mongoose');

const Order = require('./order');

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

userSchema.methods.clearCart = function() {
  this.cart = {items: []};
  return this.save();
}

module.exports = mongoose.model('User', userSchema);