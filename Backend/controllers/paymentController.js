const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');

// Create payment intent
exports.createPaymentIntent = async(req, res) => {
    try {
        const { amount, currency = 'inr', orderId, items } = req.body;

        // Validate amount (minimum 50 INR for Stripe)
        if (amount < 50) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be at least ₹50'
            });
        }

        // Create payment intent
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
        //     currency: currency,
        //     metadata: {
        //         orderId: orderId || 'temp',
        //         items: JSON.stringify(items ? .slice(0, 5) || []) // Limit metadata size
        //     },
        //     automatic_payment_methods: {
        //         enabled: true,
        //     },
        // });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });

    } catch (error) {
        console.error('Payment intent creation failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Payment initialization failed'
        });
    }
};

// Confirm payment and update order
exports.confirmPayment = async(req, res) => {
    try {
        const { paymentIntentId, orderId } = req.body;

        // Retrieve payment intent from Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Update order status if orderId exists
            if (orderId) {
                await Order.findByIdAndUpdate(orderId, {
                    status: 'Paid',
                    paymentIntentId: paymentIntentId,
                    paymentStatus: 'completed'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Payment confirmed successfully',
                paymentStatus: paymentIntent.status
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment not completed',
                paymentStatus: paymentIntent.status
            });
        }

    } catch (error) {
        console.error('Payment confirmation failed:', error.message);
        res.status(500).json({
            success: false,
            message: 'Payment confirmation failed'
        });
    }
};

// Webhook to handle Stripe events
exports.handleWebhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);

            // Update order in database
            if (paymentIntent.metadata.orderId) {
                await Order.findByIdAndUpdate(paymentIntent.metadata.orderId, {
                    status: 'Paid',
                    paymentIntentId: paymentIntent.id,
                    paymentStatus: 'completed'
                });
            }
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);

            if (failedPayment.metadata.orderId) {
                await Order.findByIdAndUpdate(failedPayment.metadata.orderId, {
                    status: 'Payment Failed',
                    paymentStatus: 'failed'
                });
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};

// Get payment status
exports.getPaymentStatus = async(req, res) => {
    try {
        const { paymentIntentId } = req.params;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        res.status(200).json({
            success: true,
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100, // Convert back to rupees
            currency: paymentIntent.currency
        });

    } catch (error) {
        console.error('Failed to get payment status:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to get payment status'
        });
    }
};