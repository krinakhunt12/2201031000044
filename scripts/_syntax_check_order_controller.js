// quick syntax check by requiring the controller
try {
    require('../Backend/controllers/orderController');
    console.log('orderController loaded successfully');
} catch (err) {
    console.error('orderController load error:', err.message);
    process.exit(1);
}