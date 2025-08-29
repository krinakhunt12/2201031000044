const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');

// Create new order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get single order by ID
router.get('/:id', getOrderById);

// Update order status
router.put('/:id/status', updateOrderStatus);

// Delete order
router.delete('/:id', deleteOrder);

module.exports = router;