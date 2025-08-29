import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false,
});

// Product API functions
export const productAPI = {
    // Get all products
    getAllProducts: async() => {
        console.log('🔄 API Call: getAllProducts');
        const response = await api.get('/products');
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Get products by category (men, women, kids)
    getProductsByCategory: async(category) => {
        console.log('🔄 API Call: getProductsByCategory', category);
        const response = await api.get(`/products/category/${category}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Get products by product type (tshirts, shirts, etc.)
    getProductsByType: async(productType) => {
        console.log('🔄 API Call: getProductsByType', productType);
        const response = await api.get(`/products/type/${productType}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Get products by category and product type (e.g., men/tshirts)
    getProductsByCategoryAndType: async(category, productType) => {
        console.log('🔄 API Call: getProductsByCategoryAndType', category, productType);
        const response = await api.get(`/products/category/${category}/type/${productType}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Add new product
    addProduct: async(productData) => {
        console.log('🔄 API Call: addProduct', productData);
        const response = await api.post('/products/add', productData);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Update product
    updateProduct: async(id, productData) => {
        console.log('🔄 API Call: updateProduct', id, productData);
        const response = await api.put(`/products/update/${id}`, productData);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Delete product
    deleteProduct: async(id) => {
        console.log('🔄 API Call: deleteProduct', id);
        const response = await api.delete(`/products/delete/${id}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    }
};

// Order API functions
export const orderAPI = {
    // Create new order
    createOrder: async(orderData) => {
        console.log('🔄 API Call: createOrder', orderData);
        const response = await api.post('/orders', orderData);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Get all orders
    getAllOrders: async() => {
        console.log('🔄 API Call: getAllOrders');
        const response = await api.get('/orders');
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Get order by ID
    getOrderById: async(id) => {
        console.log('🔄 API Call: getOrderById', id);
        const response = await api.get(`/orders/${id}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Update order status
    updateOrderStatus: async(id, status) => {
        console.log('🔄 API Call: updateOrderStatus', id, status);
        const response = await api.put(`/orders/${id}/status`, { status });
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Delete order
    deleteOrder: async(id) => {
        console.log('🔄 API Call: deleteOrder', id);
        const response = await api.delete(`/orders/${id}`);
        console.log('✅ API Response:', response.data);
        return response.data;
    }
};

// Payment API functions
export const paymentAPI = {
    // Create payment intent
    createPaymentIntent: async(orderData) => {
        console.log('🔄 API Call: createPaymentIntent', orderData);
        const response = await api.post('/payment/create-payment-intent', orderData);
        console.log('✅ API Response:', response.data);
        return response.data;
    },

    // Confirm payment
    confirmPayment: async(paymentIntentId, paymentMethodId) => {
        console.log('🔄 API Call: confirmPayment', paymentIntentId, paymentMethodId);
        const response = await api.post('/payment/confirm', {
            paymentIntentId,
            paymentMethodId
        });
        console.log('✅ API Response:', response.data);
        return response.data;
    }
};