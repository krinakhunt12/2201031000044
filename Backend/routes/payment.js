const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// helper to safely call controller methods
function callController(fnName) {
    return async(req, res, next) => {
        try {
            const fn = paymentController && paymentController[fnName];
            if (typeof fn !== 'function') {
                return res.status(501).json({ success: false, message: `Controller method ${fnName} not implemented` });
            }
            return await fn(req, res, next);
        } catch (err) {
            return next(err);
        }
    };
}

// create razorpay order
router.post('/create-payment-intent', callController('createPaymentIntent'));

// verify razorpay payment
router.post('/verify-razorpay', callController('verifyRazorpay'));

// (keep other payment routes here, wrapped with callController)

// export
module.exports = router;