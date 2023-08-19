const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  let totalItems = 0;
  Product.countDocuments()
    .then(numProds => {
      totalItems = numProds;
      return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      const opts = {
        prods: products,
        pageTitle: 'Shop',
        path: '/products',
        totalProducts: totalItems,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        currentPage: page, 
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
      };
      console.log(opts);
      res.render('shop/product-list', opts);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  let totalItems = 0;
  Product.countDocuments()
    .then(numProds => {
      totalItems = numProds;
      return Product.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      const opts = {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        totalProducts: totalItems,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1,
        currentPage: page, 
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
      };
      console.log(opts);
      res.render('shop/index', opts);
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      console.log('cart', products)
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
  .then(product => {
    return req.user.addToCart(product);
  })
  .then(result => {
    res.redirect('/cart')
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {  
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {''
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then(order => {
        if (!order) {
          next(new Error('No order found.'))
        }
        if (order.user.userId.toString() !== req.user._id.toString()) {
          return next(new Error('Unauthorized'))
        }

        const filename = `invoice-${orderId}.pdf`
        const invoicePath = path.join('data', 'invoices', filename);

        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
        });

        const pdfDoc = new PDFDocument();
        pdfDoc.pipe(fs.createWriteStream(invoicePath));
        pdfDoc.pipe(res);
        pdfDoc
          .fontSize(26)
          .text(`Invoice #${orderId}\n\n`, {underline: true});
        let totalPrice = 0.0;
        pdfDoc.fontSize(14);
        order.products.forEach((x) => {
          const subTotal = x.quantity * x.product.price;
          totalPrice += subTotal;
          pdfDoc.text(`${x.product.title}: ${x.quantity} x $${x.product.price} = $${subTotal}`)
        })
        pdfDoc.text(`\n\nTotal Price: $${totalPrice}`, {underline: true});
        pdfDoc.end();
    })
    .catch(err => next(err));
};