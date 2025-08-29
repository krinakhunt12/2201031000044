const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'Paid', 'Payment Failed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'pending'
    },
    date: { type: Date, default: Date.now },
    items: { type: Number, required: true },
    payment: { type: String, required: true },
    // Stripe payment fields
    paymentIntentId: { type: String },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending'
    },
    stripeCustomerId: { type: String },
    // Order details
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: { type: String, default: 'India' }
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        quantity: Number,
        size: String,
        color: String
    }],
    // Order tracking
    trackingNumber: { type: String },
    estimatedDelivery: { type: Date },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);