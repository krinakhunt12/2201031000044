const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now },
    items: { type: Number, required: true },
    payment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);