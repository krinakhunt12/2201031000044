const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },


    price: { type: Number, required: true },

    // Main Category (Male/Female/Kids)
    category: {
        type: String,
        enum: ["Male", "Female", "Kids"],
        required: true
    },

    // Unified product types across all categories
    productType: {
        type: String,
        enum: [
            "T-Shirts",
            "Shirts",
            "Jackets",
            "Jeans",
            "Shorts",
            "Sweaters",
            "Dresses",
            "Tops",
            "Skirts",
            "Pants"
        ],
        required: true
    },

    // Allow multiple sizes (array of allowed size strings)
    size: [{
        type: String,
        enum: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"],
    }],

    // Allow multiple colors per product
    color: [{ type: String }],
    description: { type: String },
    stock: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Out of Stock"],
        default: "Active"
    },
    sales: { type: Number, default: 0 },
    photos: [{
        data: Buffer,
        contentType: String,
        filePath: String // If image is stored in uploads folder
    }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);