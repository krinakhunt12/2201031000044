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
        // Check if filtering by user parameter
        const userFilter = req.query.user;
        let query = {};

        if (userFilter) {
            query = {
                $or: [
                    { email: userFilter },
                    { customer: { $regex: new RegExp(`^${userFilter}$`, 'i') } },
                    { phoneNumber: userFilter }
                ]
            };
        }

        const orders = await Order.find(query)
            .populate('products.productId', 'name price category')
            .sort({ createdAt: -1 }); // Most recent first

        console.log(`Found ${orders.length} orders`);

        // Transform orders for frontend display
        const transformedOrders = orders.map(order => ({
            _id: order._id,
            customer: order.customer,
            email: order.email || 'No email provided',
            amount: order.amount,
            status: order.status,
            paymentStatus: order.paymentStatus,
            payment: order.payment || 'Unknown',
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

// Get orders for a specific user identifier (email, customer name, or phone)
exports.getOrdersByUser = async(req, res) => {
    try {
        const { identifier } = req.params;
        if (!identifier) return res.status(400).json({ success: false, message: 'Identifier required' });

        // Match by email, customer (case-insensitive), or phoneNumber
        const orders = await Order.find({
            $or: [
                { email: identifier },
                { customer: { $regex: new RegExp(`^${identifier}$`, 'i') } },
                { phoneNumber: identifier }
            ]
        }).populate('products.productId', 'name price category').sort({ createdAt: -1 });

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

        res.status(200).json({ success: true, orders: transformedOrders, count: transformedOrders.length });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Alias for backwards-compatibility with routes that expect different names
exports.getAllOrders = exports.getOrders;

// Get orders for the "current" user. If authentication middleware populates req.user, that will be used.
// Otherwise accepts ?email= or ?identifier= query to fetch orders for development/testing purposes.
exports.getMyOrders = async(req, res) => {
    try {
        // Accept identifying info from req.user or query parameters
        const userEmail = req && req.user && req.user.email ? req.user.email : (req && req.query && req.query.email ? req.query.email : null);
        const userPhone = req && req.user && req.user.phone ? req.user.phone : (req && req.query && req.query.phone ? req.query.phone : null);
        const paymentIntent = req && req.query && req.query.paymentIntent ? req.query.paymentIntent : (req && req.body && req.body.paymentIntentId ? req.body.paymentIntentId : null);

        // Build a flexible OR query to match by email, phone, customer name, or payment id
        const orClauses = [];
        if (userEmail) orClauses.push({ email: userEmail.toString() });
        if (userPhone) orClauses.push({ phoneNumber: userPhone.toString() });
        if (paymentIntent) orClauses.push({ paymentIntentId: paymentIntent.toString() });
        if (req && req.user && req.user.name) orClauses.push({ customer: { $regex: new RegExp(req.user.name.toString(), 'i') } });
        if (req && req.query && req.query.identifier) orClauses.push({ customer: { $regex: new RegExp(req.query.identifier.toString(), 'i') } });

        // If nothing to search by, return empty list (do not error)
        if (orClauses.length === 0) {
            console.warn('getMyOrders: no identifier provided; returning empty orders');
            return res.status(200).json({ success: true, orders: [], count: 0, message: 'Not authenticated' });
        }

        const orders = await Order.find({ $or: orClauses })
            .populate('products.productId', 'name price category')
            .sort({ createdAt: -1 });

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

        res.status(200).json({ success: true, orders: transformedOrders, count: transformedOrders.length });
    } catch (error) {
        console.error('Error fetching my orders:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Provide updateOrder alias used by routes
exports.updateOrder = exports.updateOrderStatus;