const Order = require('../models/Order');

// Create a new order
exports.createOrder = async(req, res) => {
    try {
        const orderData = req.body;

        // Add email to order if not provided
        if (!orderData.email && orderData.customer) {
            orderData.email = `${orderData.customer.toLowerCase().replace(/\s+/g, '')}@example.com`;
        }

        const order = new Order(orderData);
        const savedOrder = await order.save();

        res.status(201).json({
            success: true,
            order: savedOrder,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get all orders with populated product information
exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.productId', 'name price category')
            .sort({ createdAt: -1 }); // Most recent first

        // Transform orders for frontend display
        const transformedOrders = orders.map(order => ({
            _id: order._id,
            customer: order.customer,
            email: order.email || 'No email provided',
            amount: order.amount,
            status: order.status,
            paymentStatus: order.paymentStatus,
            payment: order.payment,
            date: order.createdAt,
            shippingAddress: order.shippingAddress,
            products: order.products,
            paymentIntentId: order.paymentIntentId
        }));

        res.status(200).json({
            success: true,
            orders: transformedOrders,
            count: transformedOrders.length
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single order by ID
exports.getOrderById = async(req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('products.productId', 'name price category');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status
exports.updateOrderStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'Paid', 'Payment Failed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Valid statuses are: ' + validStatuses.join(', ')
            });
        }

        const order = await Order.findByIdAndUpdate(
            id, { status }, { new: true }
        ).populate('products.productId', 'name price category');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete order
exports.deleteOrder = async(req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};