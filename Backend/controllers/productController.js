const Product = require('../models/Product');

// Define allowed values
const VALID_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const VALID_STATUSES = ["Active", "Inactive"];

// -------------------- GET ALL PRODUCTS --------------------
exports.getAllProducts = async(req, res) => {
    try {
        console.log('🔍 Fetching all products...');
        const products = await Product.find({ status: "Active" }).lean();
        console.log(`✅ Found ${products.length} active products`);

        const productsWithPhotoUrls = products.map(p => mapPhotosToUrls(p, req));
        res.status(200).json({ success: true, products: productsWithPhotoUrls });
    } catch (error) {
        console.error('❌ Error fetching products:', error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- ADD PRODUCT --------------------
exports.addProduct = async(req, res) => {
    try {
        const {
            name,
            size,
            price,
            category,
            productType,
            color,
            description = "",
            stock = 0,
            status = "Active",
            sales = 0
        } = req.body;

        if (!name || !size || !price || !category || !productType || !color) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }
        if (!VALID_SIZES.includes(size)) {
            return res.status(400).json({ success: false, message: "Invalid size value." });
        }
        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }

        let photos = [];
        if (req.files && req.files.length > 0) {
            console.log(`📸 Processing ${req.files.length} uploaded files...`);
            photos = req.files.map(file => {
                // Multer diskStorage provides file.path
                const relPath = file.path.split('uploads\\')[1] || file.path.split('uploads/')[1];
                return {
                    filePath: `products/${file.filename}`,
                    contentType: file.mimetype
                };
            });
        } else {
            console.log('⚠️ No files uploaded');
        }

        const product = new Product({
            name,
            size,
            price: parseFloat(price),
            category,
            productType,
            color,
            description,
            stock: parseInt(stock, 10),
            status,
            sales: parseInt(sales, 10),
            photos,
        });

        await product.save();
        console.log(`✅ Product saved with ${photos.length} photos`);

        // Return product with photo URLs for immediate use
        const productWithUrls = mapPhotosToUrls(product.toObject(), req);
        res.status(201).json({ success: true, product: productWithUrls });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- GET PRODUCTS BY CATEGORY --------------------
exports.getProductsByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const categoryMap = { men: "Male", women: "Female", kids: "Kids" };
        const dbCategory = categoryMap[category] || category;

        const products = await Product.find({ category: dbCategory, status: "Active" }).lean();
        res.status(200).json({ success: true, products: products.map(p => mapPhotosToUrls(p, req)) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- GET PRODUCTS BY PRODUCT TYPE --------------------
exports.getProductsByProductType = async(req, res) => {
    try {
        const { productType } = req.params;
        const productTypeMap = {
            tshirts: "T-Shirts",
            shirts: "Shirts",
            jackets: "Jackets",
            jeans: "Jeans",
            shorts: "Shorts",
            sweaters: "Sweaters",
            dresses: "Dresses",
            tops: "Tops",
            skirts: "Skirts",
            pants: "Pants"
        };
        const dbProductType = productTypeMap[productType] || productType;

        const products = await Product.find({ productType: dbProductType, status: "Active" }).lean();
        res.status(200).json({ success: true, products: products.map(p => mapPhotosToUrls(p, req)) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- GET PRODUCTS BY CATEGORY AND PRODUCT TYPE --------------------
exports.getProductsByCategoryAndType = async(req, res) => {
    try {
        const { category, productType } = req.params;
        const categoryMap = { men: "Male", women: "Female", kids: "Kids" };
        const productTypeMap = {
            tshirts: "T-Shirts",
            shirts: "Shirts",
            jackets: "Jackets",
            jeans: "Jeans",
            shorts: "Shorts",
            sweaters: "Sweaters",
            dresses: "Dresses",
            tops: "Tops",
            skirts: "Skirts",
            pants: "Pants"
        };

        const dbCategory = categoryMap[category] || category;
        const dbProductType = productTypeMap[productType] || productType;

        const products = await Product.find({ category: dbCategory, productType: dbProductType, status: "Active" }).lean();
        res.status(200).json({ success: true, products: products.map(p => mapPhotosToUrls(p, req)) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- UPDATE PRODUCT --------------------
exports.updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        let photos = [];

        if (req.files && req.files.length > 0) {
            photos = req.files.map(file => ({ data: file.buffer, contentType: file.mimetype }));
        }

        const updatedData = {...req.body };

        if (updatedData.size && !VALID_SIZES.includes(updatedData.size)) {
            return res.status(400).json({ success: false, message: "Invalid size value." });
        }
        if (updatedData.status && !VALID_STATUSES.includes(updatedData.status)) {
            return res.status(400).json({ success: false, message: "Invalid status value." });
        }
        if (photos.length > 0) {
            updatedData.photos = photos;
        }

        const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- DELETE PRODUCT --------------------
exports.deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// -------------------- GET PRODUCT PHOTO --------------------
exports.getProductPhoto = async(req, res) => {
    try {
        const { id, photoIndex } = req.params;
        const idx = parseInt(photoIndex, 10) || 0;
        const product = await Product.findById(id).select('photos');

        if (!product || !product.photos || !product.photos[idx]) {
            return res.status(404).send('Image not found');
        }

        const photo = product.photos[idx];
        res.set('Content-Type', photo.contentType || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=604800, immutable'); // cache 7 days
        return res.status(200).send(photo.data);
    } catch (err) {
        console.error('Error serving product photo', err.message);
        res.status(500).send('Server error');
    }
};

// -------------------- HELPER FUNCTION --------------------
function mapPhotosToUrls(product, req) {
    const host = req.get('host');
    const protocol = req.protocol;
    // If photo has filePath, use static uploads URL
    const photos = (product.photos || []).map((ph, idx) => {
        if (ph.filePath) {
            return `${protocol}://${host}/uploads/${ph.filePath}`;
        } else if (ph.data) {
            // Legacy support for photos stored as Buffer
            return `${protocol}://${host}/api/products/${product._id}/photo/${idx}`;
        } else {
            // Fallback for missing photos
            return null;
        }
    }).filter(photo => photo !== null); // Remove null values
    return {...product, photos };
}