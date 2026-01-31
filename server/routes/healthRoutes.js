const express = require('express');
const router = express.Router();
const { logMetric, getMetrics } = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, logMetric)
    .get(protect, getMetrics);

module.exports = router;
