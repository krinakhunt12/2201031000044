const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

async function checkDuplicates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    console.log('✅ Connected to MongoDB');

    // Get all products
    const products = await Product.find({});
    console.log(`Total products in database: ${products.length}`);

    // Check for duplicates by name
    const productNames = products.map(p => p.name);
    const uniqueNames = [...new Set(productNames)];
    
    if (productNames.length !== uniqueNames.length) {
      console.log('❌ Found duplicate product names:');
      const duplicates = productNames.filter((name, index) => productNames.indexOf(name) !== index);
      console.log([...new Set(duplicates)]);
      
      // Show duplicate products
      duplicates.forEach(name => {
        const duplicateProducts = products.filter(p => p.name === name);
        console.log(`\nProduct "${name}" appears ${duplicateProducts.length} times:`);
        duplicateProducts.forEach((p, index) => {
          console.log(`  ${index + 1}. ID: ${p._id}, Created: ${p.createdAt}`);
        });
      });
    } else {
      console.log('✅ No duplicate product names found');
    }

    // Check for exact duplicates (same name, category, productType, price)
    const duplicateGroups = [];
    const seen = new Set();
    
    products.forEach(product => {
      const key = `${product.name}-${product.category}-${product.productType}-${product.price}`;
      if (seen.has(key)) {
        const existingGroup = duplicateGroups.find(group => group.key === key);
        if (existingGroup) {
          existingGroup.products.push(product);
        } else {
          duplicateGroups.push({
            key,
            products: [product]
          });
        }
      } else {
        seen.add(key);
      }
    });

    if (duplicateGroups.length > 0) {
      console.log('\n❌ Found exact duplicate products:');
      duplicateGroups.forEach(group => {
        console.log(`\nDuplicate group: ${group.key}`);
        group.products.forEach((p, index) => {
          console.log(`  ${index + 1}. ID: ${p._id}, Created: ${p.createdAt}`);
        });
      });
    } else {
      console.log('✅ No exact duplicate products found');
    }

    // Show all products
    console.log('\n📋 All products in database:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.category} - ${product.productType}) - ₹${product.price} - ID: ${product._id}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

checkDuplicates();
