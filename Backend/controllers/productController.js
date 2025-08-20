// Get all products
exports.getAllProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const Product = require('../models/Product');

// Add a new product
exports.addProduct = async(req, res) => {
    try {
        // For multipart/form-data, all fields are strings
        const name = req.body.name;
        const size = req.body.size;
        const price = parseFloat(req.body.price);
        const category = req.body.category;
        const color = req.body.color;
        const stock = req.body.stock ? parseInt(req.body.stock, 10) : 0;
        const status = req.body.status || "Active";
        const sales = req.body.sales ? parseInt(req.body.sales, 10) : 0;
        let photos = [];
        if (req.files && req.files.length > 0) {
            photos = req.files.map(file => `/uploads/products/${file.filename}`);
        }
        if (!name || !size || !price || !category || !color) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }
        const product = new Product({
            name,
            size,
            price,
            category,
            color,
            stock,
            status,
            sales,
            photos,
        });
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get products by category
exports.getProductsByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category });
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};