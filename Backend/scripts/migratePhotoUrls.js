const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function migratePhotoUrls() {
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
                    // This photo is stored as Buffer and needs migration
                    console.log(`⚠️ Product ${product._id} has photo stored as Buffer - needs manual migration`);
                    needsUpdate = true;
                    // For now, keep the old format but mark it
                    updatedPhotos.push({
                        ...photo,
                        needsMigration: true
                    });
                } else if (photo.filePath) {
                    // This photo already has filePath - good
                    updatedPhotos.push(photo);
                } else {
                    // Invalid photo entry
                    console.log(`❌ Product ${product._id} has invalid photo entry`);
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
        console.log(`📝 Note: Products with Buffer-stored photos need manual migration`);

    } catch (error) {
        console.error('❌ Migration failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the migration
migratePhotoUrls();
