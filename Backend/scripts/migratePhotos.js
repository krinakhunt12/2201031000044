const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stylon');

const Product = require('../models/Product');

async function migratePhotos() {
    try {
        console.log('🔄 Starting photo migration...');

        // Find products with empty photos array
        const productsWithoutPhotos = await Product.find({
            $or: [
                { photos: { $exists: false } },
                { photos: { $size: 0 } }
            ]
        });

        console.log(`📋 Found ${productsWithoutPhotos.length} products without photos`);

        for (const product of productsWithoutPhotos) {
            console.log(`Processing product: ${product.name} (${product._id})`);

            // Check if there are any files in uploads/products for this product
            const uploadsDir = path.join(__dirname, '../uploads/products');

            if (fs.existsSync(uploadsDir)) {
                const files = fs.readdirSync(uploadsDir);

                // Look for files that might belong to this product
                // This is a simple approach - you might need to adjust based on your file naming
                const productFiles = files.filter(file =>
                    file.toLowerCase().includes(product.name.toLowerCase().replace(/\s+/g, '')) ||
                    file.includes(product._id.toString().slice(-6)) // last 6 chars of ID
                );

                if (productFiles.length > 0) {
                    console.log(`  📸 Found ${productFiles.length} potential files: ${productFiles.join(', ')}`);

                    const photos = [];
                    for (const fileName of productFiles.slice(0, 5)) { // max 5 photos
                        const filePath = path.join(uploadsDir, fileName);

                        try {
                            const fileBuffer = fs.readFileSync(filePath);
                            const contentType = fileName.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';

                            photos.push({
                                data: fileBuffer,
                                contentType: contentType
                            });

                            console.log(`    ✅ Added ${fileName} (${fileBuffer.length} bytes)`);
                        } catch (err) {
                            console.log(`    ❌ Error reading ${fileName}:`, err.message);
                        }
                    }

                    if (photos.length > 0) {
                        await Product.findByIdAndUpdate(product._id, { photos });
                        console.log(`  ✅ Updated product with ${photos.length} photos`);
                    }
                }
            }
        }

        console.log('✅ Migration completed!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migratePhotos();