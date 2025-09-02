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
        const { amount, currency = 'INR', orderId, items } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount' });
        }

        // Convert to paise
        const paise = Math.round(amount * 100);

        if (!razorpayInstance) {
            return res.status(500).json({ success: false, message: 'Razorpay not configured on server' });
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
        console.error('Razorpay order creation failed:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }
};

// (Stripe removed) confirmPayment endpoint is not supported when Stripe is disabled.

// Stripe webhooks removed — use Razorpay verification from client-side.

// Stripe status endpoint removed.

// Verify Razorpay payment signature sent from client
exports.verifyRazorpayPayment = async(req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        if (!razorpayInstance) {
            return res.status(500).json({ success: false, message: 'Razorpay not configured' });
        }

        const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            // Update order status if orderId provided
            if (orderId) {
                await Order.findByIdAndUpdate(orderId, {
                    status: 'Paid',
                    paymentProvider: 'razorpay',
                    paymentIntentId: razorpay_payment_id,
                    paymentStatus: 'completed'
                });
            }

            return res.status(200).json({ success: true, message: 'Payment verified' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

    } catch (err) {
        console.error('Razorpay verification failed:', err.message);
        return res.status(500).json({ success: false, message: 'Verification failed' });
    }
};