const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { addProduct, getProductsByCategory, getAllProducts } = require('../controllers/productController');

// Multer setup for photo uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/products'));
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });


// Get all products
router.get('/', getAllProducts);

// Add a new product with photos
router.post('/add', upload.array('photos', 5), addProduct);

// Get products by category
router.get('/category/:category', getProductsByCategory);

module.exports = router;