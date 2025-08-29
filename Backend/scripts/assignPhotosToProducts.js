const mongoose = require('mongoose');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function assignPhotosToProducts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: false,
        });
        console.log('✅ Connected to MongoDB');

        // Get all uploaded files
        const uploadsDir = path.join(__dirname, '../uploads/products');
        const files = fs.readdirSync(uploadsDir);
        console.log(`📁 Found ${files.length} uploaded files`);

        // Get all products
        const products = await Product.find({});
        console.log(`📦 Found ${products.length} products`);

        // Assign photos to products (simple mapping for now)
        // In a real scenario, you'd want to match based on product names or IDs
        for (let i = 0; i < products.length && i < files.length; i++) {
            const product = products[i];
            const file = files[i];
            
            // Get file extension and determine content type
            const ext = path.extname(file).toLowerCase();
            let contentType = 'image/jpeg';
            if (ext === '.png') contentType = 'image/png';
            else if (ext === '.gif') contentType = 'image/gif';
            else if (ext === '.bmp') contentType = 'image/bmp';

            const photoData = {
                filePath: `products/${file}`,
                contentType: contentType
            };

            try {
                await Product.findByIdAndUpdate(product._id, { 
                    photos: [photoData] 
                });
                console.log(`✅ Assigned photo ${file} to product ${product.name}`);
            } catch (error) {
                console.error(`❌ Failed to assign photo to product ${product.name}:`, error.message);
            }
        }

        console.log(`\n📊 Assignment Summary:`);
        console.log(`✅ Assigned photos to ${Math.min(products.length, files.length)} products`);

    } catch (error) {
        console.error('❌ Assignment failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the assignment
assignPhotosToProducts();
