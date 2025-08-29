const mongoose = require('mongoose');
const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function fixPhotoMigration() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: false,
        });
        console.log('✅ Connected to MongoDB');

        // Find all products
        const products = await Product.find({});
        console.log(`📦 Found ${products.length} products to check`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const product of products) {
            let needsUpdate = false;
            const updatedPhotos = [];

            for (const photo of product.photos || []) {
                if (photo.data && !photo.filePath) {
                    // This photo is stored as Buffer - we need to save it to file
                    console.log(`📸 Processing Buffer photo for product ${product._id}`);
                    
                    try {
                        // Generate a unique filename
                        const timestamp = Date.now();
                        const randomSuffix = Math.round(Math.random() * 1E9);
                        const extension = photo.contentType ? photo.contentType.split('/')[1] : 'jpg';
                        const filename = `${timestamp}-${randomSuffix}-product-${product._id}.${extension}`;
                        const filePath = `products/${filename}`;
                        const fullPath = path.join(__dirname, '../uploads', filePath);

                        // Ensure uploads directory exists
                        const uploadsDir = path.dirname(fullPath);
                        if (!fs.existsSync(uploadsDir)) {
                            fs.mkdirSync(uploadsDir, { recursive: true });
                        }

                        // Write the Buffer to file
                        fs.writeFileSync(fullPath, photo.data);
                        console.log(`💾 Saved photo to ${filePath}`);

                        // Update photo object
                        updatedPhotos.push({
                            filePath: filePath,
                            contentType: photo.contentType || 'image/jpeg'
                        });
                        needsUpdate = true;
                    } catch (error) {
                        console.error(`❌ Failed to save photo for product ${product._id}:`, error.message);
                        // Keep the original photo as fallback
                        updatedPhotos.push(photo);
                    }
                } else if (photo.filePath) {
                    // This photo already has filePath - good
                    updatedPhotos.push(photo);
                } else {
                    // Invalid photo entry - remove it
                    console.log(`❌ Removing invalid photo entry for product ${product._id}`);
                    needsUpdate = true;
                }
            }

            if (needsUpdate) {
                try {
                    await Product.findByIdAndUpdate(product._id, { photos: updatedPhotos });
                    updatedCount++;
                    console.log(`✅ Updated product ${product._id}`);
                } catch (error) {
                    console.error(`❌ Failed to update product ${product._id}:`, error.message);
                }
            } else {
                skippedCount++;
            }
        }

        console.log(`\n📊 Migration Summary:`);
        console.log(`✅ Updated: ${updatedCount} products`);
        console.log(`⏭️ Skipped: ${skippedCount} products`);

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the migration
fixPhotoMigration();
