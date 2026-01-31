const express = require('express');
const router = express.Router();
const { triggerOptimization, getSimulation } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/optimize', protect, triggerOptimization);
router.get('/simulation', protect, getSimulation);

const { updateAIProfile } = require('../controllers/aiController');
router.put('/profile', protect, updateAIProfile);

module.exports = router;
