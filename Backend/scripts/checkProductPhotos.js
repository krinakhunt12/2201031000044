const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function checkProductPhotos() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: false,
        });
        console.log('✅ Connected to MongoDB');

        // Find all products
        const products = await Product.find({});
        console.log(`📦 Found ${products.length} products`);

        products.forEach((product, index) => {
            console.log(`\n--- Product ${index + 1}: ${product.name} (${product._id}) ---`);
            console.log(`Photos count: ${product.photos ? product.photos.length : 0}`);
            
            if (product.photos && product.photos.length > 0) {
                product.photos.forEach((photo, photoIndex) => {
                    console.log(`  Photo ${photoIndex + 1}:`);
                    console.log(`    - Has data: ${!!photo.data}`);
                    console.log(`    - Has filePath: ${!!photo.filePath}`);
                    console.log(`    - filePath: ${photo.filePath || 'N/A'}`);
                    console.log(`    - contentType: ${photo.contentType || 'N/A'}`);
                });
            } else {
                console.log('  No photos found');
            }
        });

    } catch (error) {
        console.error('❌ Check failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the check
checkProductPhotos();
