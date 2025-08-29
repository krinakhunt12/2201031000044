const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/adminAuth');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user');
const statsRoutes = require('./routes/stats');
const paymentRoutes = require('./routes/payment');
require('dotenv').config();

const app = express();

// Webhook route must be BEFORE express.json() middleware
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Admin dashboard APIs
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

// Connect to MongoDB with TLS options
mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsAllowInvalidCertificates: false,
    })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    });


app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});