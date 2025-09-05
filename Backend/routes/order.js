const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// helper to safely call controller methods
function callController(fnName) {
    return async(req, res, next) => {
        try {
            const fn = orderController && orderController[fnName];
            if (typeof fn !== 'function') {
                return res.status(501).json({ success: false, message: `Controller method ${fnName} not implemented` });
            }
            return await fn(req, res, next);
        } catch (err) {
            return next(err);
        }
    };
}

// Create order
router.post('/', callController('createOrder'));

// Admin / list (all orders or filtered by ?user=identifier)
router.get('/', callController('getAllOrders'));

// My orders (requires auth in future; falls back to query if implemented)
router.get('/me', callController('getMyOrders'));

// Get orders for a specific user identifier
router.get('/user/:identifier', callController('getOrdersByUser'));

// Get single order
router.get('/:id', callController('getOrderById'));

// Update order
router.patch('/:id', callController('updateOrder'));

// Delete order
router.delete('/:id', callController('deleteOrder'));

module.exports = router;