const mongoose = require('mongoose');
const Product = require('../models/Product');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stylon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fixProductData = async () => {
    try {
        console.log('Starting to fix product data...');

        // Find all products with invalid categories or missing productType
        const invalidProducts = await Product.find({
            $or: [
                { category: { $nin: ['Male', 'Female', 'Kids'] } },
                { productType: { $exists: false } },
                { productType: null }
            ]
        });

        console.log(`Found ${invalidProducts.length} products with invalid data`);

        for (const product of invalidProducts) {
            console.log(`Fixing product: ${product.name} (ID: ${product._id})`);
            
            let updates = {};

            // Fix invalid categories
            if (product.category === 'f' || product.category === 'Female') {
                updates.category = 'Female';
            } else if (product.category === 'm' || product.category === 'Male') {
                updates.category = 'Male';
            } else if (product.category === 'k' || product.category === 'Kids') {
                updates.category = 'Kids';
            } else {
                // Default to Female if category is completely invalid
                updates.category = 'Female';
            }

            // Add missing productType
            if (!product.productType) {
                // Try to infer productType from name or description
                const name = product.name.toLowerCase();
                const description = (product.description || '').toLowerCase();
                
                if (name.includes('tshirt') || name.includes('t-shirt') || name.includes('tee')) {
                    updates.productType = 'T-Shirts';
                } else if (name.includes('shirt') && !name.includes('tshirt')) {
                    updates.productType = 'Shirts';
                } else if (name.includes('jean') || name.includes('denim')) {
                    updates.productType = 'Jeans';
                } else if (name.includes('jacket') || name.includes('coat')) {
                    updates.productType = 'Jackets';
                } else if (name.includes('short')) {
                    updates.productType = 'Shorts';
                } else if (name.includes('sweater') || name.includes('jumper')) {
                    updates.productType = 'Sweaters';
                } else if (name.includes('dress')) {
                    updates.productType = 'Dresses';
                } else if (name.includes('top') || name.includes('blouse')) {
                    updates.productType = 'Tops';
                } else if (name.includes('skirt')) {
                    updates.productType = 'Skirts';
                } else if (name.includes('pant') || name.includes('trouser')) {
                    updates.productType = 'Pants';
                } else {
                    // Default to T-Shirts if we can't determine
                    updates.productType = 'T-Shirts';
                }
            }

            // Fix invalid sizes
            if (product.size && !['XXS', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].includes(product.size)) {
                // Try to extract valid size from the string
                const sizeStr = product.size.toUpperCase();
                if (sizeStr.includes('S') && sizeStr.includes('M') && sizeStr.includes('L')) {
                    updates.size = 'M'; // Default to M if multiple sizes
                } else if (sizeStr.includes('S')) {
                    updates.size = 'S';
                } else if (sizeStr.includes('M')) {
                    updates.size = 'M';
                } else if (sizeStr.includes('L')) {
                    updates.size = 'L';
                } else {
                    updates.size = 'M'; // Default size
                }
            }

            // Update the product
            if (Object.keys(updates).length > 0) {
                await Product.findByIdAndUpdate(product._id, updates);
                console.log(`Updated product ${product.name}:`, updates);
            }
        }

        console.log('Product data fix completed!');
        
        // Show summary
        const totalProducts = await Product.countDocuments();
        const validProducts = await Product.countDocuments({
            category: { $in: ['Male', 'Female', 'Kids'] },
            productType: { $exists: true, $ne: null }
        });
        
        console.log(`Total products: ${totalProducts}`);
        console.log(`Valid products: ${validProducts}`);
        console.log(`Invalid products: ${totalProducts - validProducts}`);

    } catch (error) {
        console.error('Error fixing product data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the script
fixProductData();
