const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const mongoose = require('mongoose');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        user: req.session.user,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        user: req.session.user,
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        user: req.session.user,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.session.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      console.log('cart', products)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        user: req.session.user,
      });
  })
  .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.session.user.addToCart(product);
  })
  .then(result => {
    console.log(result);
    res.redirect('/cart');
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(req.session.user);
  req.session.user
    .removeFromCart(prodId)
    .then(result => {
    User.findOne({'email': 'max@test.com'})
      .then(user => {
        req.session.user = user;
        res.redirect('/cart')
      })
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.session.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.session.user.name,
          userId: req.session.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.session.user.clearCart();
    })
    .then(() => {
      User.findOne({'email': 'max@test.com'})
      .then(user => {
        req.session.user = user;
      })
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {  
  Order.find({ 'user.userId': req.session.user._id })
    .then(orders => {''
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        user: req.session.user,
      });
    })
    .catch(err => console.log(err));
};
