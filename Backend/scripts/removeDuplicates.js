const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function removeDuplicates() {
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

        // Group by name and category to find duplicates
        const groupedProducts = {};
        products.forEach(product => {
            const key = `${product.name}-${product.category}`;
            if (!groupedProducts[key]) {
                groupedProducts[key] = [];
            }
            groupedProducts[key].push(product);
        });

        let removedCount = 0;
        const duplicatesToRemove = [];

        // Find duplicates (keep the first one, remove the rest)
        Object.keys(groupedProducts).forEach(key => {
            const group = groupedProducts[key];
            if (group.length > 1) {
                console.log(`\n🔍 Found ${group.length} duplicates for "${group[0].name}" in ${group[0].category} category:`);
                group.forEach((product, index) => {
                    console.log(`  ${index + 1}. ID: ${product._id}, Created: ${product.createdAt}`);
                });
                
                // Keep the first one (oldest), remove the rest
                const toRemove = group.slice(1);
                duplicatesToRemove.push(...toRemove);
                removedCount += toRemove.length;
            }
        });

        if (duplicatesToRemove.length > 0) {
            console.log(`\n🗑️ Removing ${duplicatesToRemove.length} duplicate products...`);
            
            for (const product of duplicatesToRemove) {
                try {
                    await Product.findByIdAndDelete(product._id);
                    console.log(`✅ Removed duplicate: ${product.name} (${product._id})`);
                } catch (error) {
                    console.error(`❌ Failed to remove ${product.name}:`, error.message);
                }
            }
        } else {
            console.log('✅ No duplicates found to remove');
        }

        // Final count
        const finalCount = await Product.countDocuments();
        console.log(`\n📊 Summary:`);
        console.log(`- Original products: ${products.length}`);
        console.log(`- Removed duplicates: ${removedCount}`);
        console.log(`- Final products: ${finalCount}`);

    } catch (error) {
        console.error('❌ Removal failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the removal
removeDuplicates();
