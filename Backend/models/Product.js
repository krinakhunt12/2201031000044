const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
    photos: [{ type: String }], // Array of image URLs or file paths
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);