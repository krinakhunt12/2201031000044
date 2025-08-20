const express = require('express');
const router = express.Router();
const { getOrders, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

// Get all orders
router.get('/', getOrders);

// Update order status
router.put('/:id/status', updateOrderStatus);

// Delete order
router.delete('/:id', deleteOrder);

module.exports = router;