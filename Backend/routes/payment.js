const express = require('express');
const router = express.Router();
const {
    createPaymentIntent,
    verifyRazorpayPayment
} = require('../controllers/paymentController');

// Create Razorpay order
router.post('/create-payment-intent', createPaymentIntent);

// Verify Razorpay payment (signature verification from client)
router.post('/verify-razorpay', express.json(), verifyRazorpayPayment);

module.exports = router;