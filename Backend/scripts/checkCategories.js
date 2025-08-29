const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function checkCategories() {
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

        // Group by category
        const categories = {};
        products.forEach((product) => {
            const category = product.category || 'Unknown';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({
                id: product._id,
                name: product.name,
                productType: product.productType
            });
        });

        // Display results
        Object.keys(categories).forEach(category => {
            console.log(`\n--- ${category} Category (${categories[category].length} products) ---`);
            categories[category].forEach((product, index) => {
                console.log(`  ${index + 1}. ${product.name} (${product.productType}) - ID: ${product.id}`);
            });
        });

        // Check for duplicates
        console.log('\n🔍 Checking for duplicates...');
        const allNames = products.map(p => p.name);
        const duplicates = allNames.filter((name, index) => allNames.indexOf(name) !== index);
        
        if (duplicates.length > 0) {
            console.log('❌ Found duplicate product names:');
            [...new Set(duplicates)].forEach(name => {
                const productsWithName = products.filter(p => p.name === name);
                console.log(`  - "${name}" appears ${productsWithName.length} times:`);
                productsWithName.forEach(p => {
                    console.log(`    * ID: ${p._id}, Category: ${p.category}, Type: ${p.productType}`);
                });
            });
        } else {
            console.log('✅ No duplicate product names found');
        }

    } catch (error) {
        console.error('❌ Check failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

// Run the check
checkCategories();
