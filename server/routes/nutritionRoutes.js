const express = require('express');
const router = express.Router();
const { getNutritionLogs, addNutritionLog, deleteNutritionLog } = require('../controllers/nutritionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNutritionLogs)
    .post(protect, addNutritionLog);

router.route('/:id')
    .delete(protect, deleteNutritionLog);

module.exports = router;
