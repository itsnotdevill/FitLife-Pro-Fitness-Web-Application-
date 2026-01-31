const express = require('express');
const router = express.Router();
const { getAdminStats, getAllData } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/dashboard', protect, admin, getAdminStats);
router.get('/data', protect, admin, getAllData);

module.exports = router;
