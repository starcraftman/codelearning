const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

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
  if (!req.session.user) {
    return res.redirect('/')
  }

  User.findOne({'_id': req.session.user._id})
    .then(user => {
      user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
          const products = user.cart.items;
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products,
            user: req.session.user,
          });
      })
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  User.findOne({'_id': req.session.user._id})
    .then(user => {
      Product.findById(prodId)
      .then(product => {
        return user.addToCart(product);
      })
      .then(result => {
        console.log(result);
        res.redirect('/cart');
      });
    })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  User.findOne({'_id': req.session.user._id})
    .then(user => {
      user
        .removeFromCart(prodId)
        .then(result => {
          res.redirect('/cart');
        })
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  User.findOne({'_id': req.session.user._id})
    .then(user => {
      user
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
          return user.clearCart();
        })
        .then(() => {
          res.redirect('/orders');
        })
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/')
  }
  
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
