# Stylon Product Management System Guide

## Overview
This system automatically categorizes and displays products based on their category and product type. When you add a product through the admin panel, it automatically appears on the appropriate pages based on its classification.

## How It Works

### 1. Product Classification
Products are classified using two main fields:
- **Category**: Male, Female, Kids
- **Product Type**: T-Shirts, Shirts, Jackets, Jeans, Shorts, Sweaters, Dresses, Tops, Skirts, Pants

### 2. Automatic Routing
The system automatically maps URL-friendly names to database values:
- URL: `/category/men/tshirts` → Database: `category: "Male", productType: "T-Shirts"`
- URL: `/category/women/dresses` → Database: `category: "Female", productType: "Dresses"`
- URL: `/category/kids/pants` → Database: `category: "Kids", productType: "Pants"`

## Complete Route Structure

### Main Category Pages
- `/category/men` - Shows all men's products with category cards
- `/category/women` - Shows all women's products with category cards  
- `/category/kids` - Shows all kids' products with category cards

### Men's Subcategory Pages
- `/category/men/tshirts` - Men's T-Shirts
- `/category/men/shirts` - Men's Shirts
- `/category/men/jeans` - Men's Jeans
- `/category/men/jackets` - Men's Jackets
- `/category/men/shorts` - Men's Shorts
- `/category/men/sweaters` - Men's Sweaters

### Women's Subcategory Pages
- `/category/women/dresses` - Women's Dresses
- `/category/women/tops` - Women's Tops
- `/category/women/skirts` - Women's Skirts
- `/category/women/jeans` - Women's Jeans
- `/category/women/jackets` - Women's Jackets
- `/category/women/sweaters` - Women's Sweaters
- `/category/women/bottoms` - Women's Bottoms (maps to Pants)

### Kids' Subcategory Pages
- `/category/kids/tshirts` - Kids' T-Shirts
- `/category/kids/dresses` - Kids' Dresses
- `/category/kids/pants` - Kids' Pants
- `/category/kids/jackets` - Kids' Jackets
- `/category/kids/sweaters` - Kids' Sweaters
- `/category/kids/shorts` - Kids' Shorts

## API Endpoints

### Backend Routes
- `GET /api/products` - Get all active products
- `GET /api/products/category/:category` - Get products by category (men/women/kids)
- `GET /api/products/type/:productType` - Get products by type (tshirts/shirts/etc.)
- `GET /api/products/category/:category/type/:productType` - Get products by category and type
- `POST /api/products/add` - Add new product
- `PUT /api/products/update/:id` - Update product

### Frontend API Service
```javascript
// Get all products
productAPI.getAllProducts()

// Get products by category
productAPI.getProductsByCategory('men')
productAPI.getProductsByCategory('women')
productAPI.getProductsByCategory('kids')

// Get products by type
productAPI.getProductsByType('tshirts')
productAPI.getProductsByType('dresses')

// Get products by category and type
productAPI.getProductsByCategoryAndType('men', 'tshirts')
productAPI.getProductsByCategoryAndType('women', 'dresses')
```

## Product Model Schema
```javascript
{
  name: String (required),
  size: String (enum: ["XXS", "XS", "S", "M", "L", "XL", "2XL", "3XL"]),
  price: Number (required),
  category: String (enum: ["Male", "Female", "Kids"]),
  productType: String (enum: ["T-Shirts", "Shirts", "Jackets", "Jeans", "Shorts", "Sweaters", "Dresses", "Tops", "Skirts", "Pants"]),
  color: String (required),
  description: String,
  stock: Number (default: 0),
  status: String (enum: ["Active", "Inactive", "Out of Stock"]),
  sales: Number (default: 0),
  photos: [String],
  timestamps: true
}
```

## How Products Are Displayed

### 1. Main Category Pages
- Fetch all products for the category (e.g., all men's products)
- Group products by type to show counts in category cards
- Display popular items sorted by rating
- Show current offers and hero sections

### 2. Subcategory Pages
- Fetch products by specific category and product type
- Display products in a responsive grid
- Show loading states and error handling
- Include product cards with images, prices, ratings, and add to cart functionality

### 3. Product Cards
- Display product image (from photos array or fallback)
- Show product name, description, price
- Include rating, size options, and color indicators
- Add to wishlist and quick view functionality

## Adding Products

### Through Admin Panel
1. Navigate to Admin Dashboard
2. Go to Add Product section
3. Fill in required fields:
   - Name
   - Size
   - Price
   - Category (Male/Female/Kids)
   - Product Type (T-Shirts/Shirts/etc.)
   - Color
   - Description (optional)
   - Stock quantity
   - Upload photos
4. Save the product

### Automatic Display
Once saved, the product will automatically appear on:
- The main category page (e.g., `/category/men`)
- The specific subcategory page (e.g., `/category/men/tshirts`)
- The popular items section if it has a high rating
- The category count will update automatically

## Data Fix Script

### Running the Data Fix Script
If you have invalid product data in your database, run the fix script:

```bash
cd Backend
node scripts/fixProductData.js
```

This script will:
- Fix invalid categories (f → Female, m → Male, k → Kids)
- Add missing productType fields based on product names
- Fix invalid size values
- Update all products to match the schema requirements

## Features

### Dynamic Content
- All product counts are calculated dynamically
- Popular items are sorted by rating
- Loading states and error handling
- Responsive design for all screen sizes

### SEO Friendly
- Clean URL structure
- Descriptive page titles and meta descriptions
- Optimized images with lazy loading

### User Experience
- Smooth transitions and hover effects
- Quick view functionality
- Wishlist management
- Add to cart functionality
- Newsletter subscription

## Error Handling
- Network errors are caught and displayed
- Loading states show during API calls
- Fallback images for missing product photos
- Graceful degradation for missing data

## Performance
- API calls are optimized with proper caching
- Images are lazy loaded
- Responsive images with proper sizing
- Efficient database queries with proper indexing

This system provides a complete, scalable solution for managing and displaying products across multiple categories and subcategories with automatic routing and dynamic content updates.
