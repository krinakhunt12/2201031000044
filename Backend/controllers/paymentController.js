const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Stripe removed — use Razorpay for payments

// Initialize Razorpay instance when keys present
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    try {
        razorpayInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
    } catch (err) {
        console.warn('Failed to initialize Razorpay:', err.message);
        razorpayInstance = null;
    }
} else {
    console.warn('RAZORPAY keys not set; Razorpay features are disabled.');
}

// Create Razorpay order
exports.createPaymentIntent = async(req, res) => {
    try {
        const { amount, currency = 'INR', orderId, items = [], user = {} } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        const paise = Math.round(Number(amount) * 100);

        if (!razorpayInstance) {
            return res.status(500).json({ success: false, message: 'Razorpay not configured' });
        }

        const options = {
            amount: paise,
            currency: (currency || 'INR').toUpperCase(),
            receipt: orderId || `rcpt_${Date.now()}`,
            payment_capture: 1,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);
        return res.status(200).json({ success: true, razorpayOrder });
    } catch (error) {
        console.error('Create Razorpay order failed:', error);
        return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }
};

// Verify Razorpay payment and create/update Order in DB
exports.verifyRazorpay = async(req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId, // optional: your app order id or client-provided id
            amount, // optional: amount in rupees
            items = [], // optional: items/products array [{ productId, name, price, quantity }, ...]
            user = {}, // optional: { userId, email, phone }
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Missing Razorpay fields' });
        }

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ success: false, message: 'Razorpay secret not configured' });
        }

        // Verify signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const expectedSignature = hmac.digest('hex');

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        // At this point payment is successful. Create or update order in DB.
        const orderData = {
            status: 'Paid',
            paymentStatus: 'completed',
            paymentIntentId: razorpay_payment_id, // Store Razorpay payment ID in existing field
            payment: 'Razorpay', // Update payment method
            amount: amount ? Number(amount) : undefined,
            email: user.email || undefined,
            phoneNumber: user.phone || undefined,
            customer: user.name || user.customer || 'Guest Customer',
            items: items.length || 1,
        };

        let savedOrder;
        if (orderId) {
            // Try update existing order record (if you created an order earlier with orderId)
            savedOrder = await Order.findByIdAndUpdate(
                orderId, { $set: orderData }, { new: true, upsert: true } // upsert in case record wasn't present
            );
        } else {
            // Create a new order
            const newOrder = new Order(orderData);
            savedOrder = await newOrder.save();
        }

        return res.status(200).json({ success: true, message: 'Payment verified and order saved', order: savedOrder });
    } catch (error) {
        console.error('Razorpay verification failed:', error);
        return res.status(500).json({ success: false, message: 'Razorpay verification failed' });
    }
};