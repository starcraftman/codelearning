const { validationResult } = require('express-validator')

const Product = require('../models/product');
const fileHelp = require('../util/file');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    product: {
      title: '',
      price: '',
      description: '',
      _id: ''
    },
    editing: false,
    validationErrors: [],
  });
};

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);

  try {
    if(!req.file) {
      const err = new Error('The attached file was not valid.');
      err.errors = [{msg: err.message}];
      throw err;
    }
    if (!errors.isEmpty()) {
      const err = new Error('Validation errors caught by express-validator.');
      err.errors = errors.array();
      throw err;
    }  
  } catch (err) {
    return res
    .status(422)
    .render('admin/edit-product', {
      path: '/admin/add-product',
      pageTitle: 'Add Product',
      product: {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        _id: ''
      },
      editing: false,
      validationErrors: err.errors,
    });
  }

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    imageUrl: req.file.path,
    description: req.body.description,
    userId: req.user._id
  });
  console.log('new product', product);
  product
    .save()
    .then(result => {
      console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        validationErrors: [],
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .render('admin/edit-product', {
        path: '/admin/edit-product',
        pageTitle: 'Edit Product',
        product: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
          _id: req.body.productId
        },
        editing: true,
        validationErrors: errors.array(),
      });
  }

  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() != req.user._id.toString()) {
        return res.redirect('/')
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      if (req.file) {
        fileHelp.deleteFile(product.imageUrl);
        product.imageUrl = req.file.path;
      }
       return product.save()
      .then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      })
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log('del', prodId)
  Product.findById(prodId)
    .then(product => {
      fileHelp.deleteFile(product.imageUrl);
      return Product.deleteOne({
        _id: prodId,
        userId: req.user._id
      })
    })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.status(200).json({message: 'Success!'})
    })
    .catch(err => {
      res.status(500).json({message: "Deleting product failed."})
    });
};