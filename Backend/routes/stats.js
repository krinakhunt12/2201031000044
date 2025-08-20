const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');

// Get dashboard stats
router.get('/', statsController.getStats);

module.exports = router;