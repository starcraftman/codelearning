const path = require('path');
const { body } = require('express-validator')

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
    '/add-product', 
    [
        body('title', 'Title must be alphanumeric, at least 5 characters.')
            .trim()
            .isString()
            .isLength({min: 5}),
        body('price', 'Price must be a valid number.')
            .trim()
            .isFloat(),
        body('imageUrl', 'Image URL must contain a valid link.')
            .trim()
            .isURL(),
        body('description', 'Description be at least 5 characters.')
            .trim()
            .isLength({min: 5}),
    ],
    isAuth, 
    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product', 
    [
        body('title', 'Title must be alphanumeric, at least 5 characters.')
            .trim()
            .isString()
            .isLength({min: 5}),
        body('price', 'Price must be a valid number.')
            .trim()
            .isFloat(),
        body('imageUrl', 'Image URL must contain a valid link.')
            .trim()
            .isURL(),
        body('description', 'Description be at least 5 characters.')
            .trim()
            .isLength({min: 5}),
    ],
    isAuth,
    isAuth, 
    adminController.postEditProduct
);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
