const express = require('express');
const router = express.Router();
const {
    createPaymentIntent,
    confirmPayment,
    handleWebhook,
    getPaymentStatus
} = require('../controllers/paymentController');

// Create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Confirm payment
router.post('/confirm-payment', confirmPayment);

// Stripe webhook (must be before express.json() middleware)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Get payment status
router.get('/status/:paymentIntentId', getPaymentStatus);

module.exports = router;