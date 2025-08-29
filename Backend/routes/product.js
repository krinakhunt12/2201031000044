const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Configure multer for file uploads - use diskStorage to save files to uploads/products
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/products'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|bmp)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Serve static files for legacy support
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
router.get('/', productController.getAllProducts);
router.post('/add', upload.array('photos', 5), productController.addProduct);
router.get('/:id/photo/:photoIndex', productController.getProductPhoto);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/type/:productType', productController.getProductsByProductType);
router.get('/category/:category/type/:productType', productController.getProductsByCategoryAndType);
router.put('/update/:id', upload.array('photos', 5), productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;