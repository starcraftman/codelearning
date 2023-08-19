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

const orderSchema = new mongoose.Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
  },
  products: [{
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number, 
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Order', orderSchema);