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
    // NOTE: previously this field used an enum. To allow admins to create new product types
    // at runtime, we keep this as a plain string and validate / normalize on the client.
    productType: {
        type: String,
        required: true
    },

    // Allow multiple sizes (array of allowed size strings)
    // Sizes are free-form strings (e.g., 'M', 'XL', or numeric '24') to support garments like jeans
    size: [{
        type: String,
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