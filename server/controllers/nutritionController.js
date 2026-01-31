const Nutrition = require('../models/Nutrition');

// @desc    Get user nutrition logs
// @route   GET /api/nutrition
// @access  Private
const getNutritionLogs = async (req, res) => {
    const logs = await Nutrition.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(logs);
};

// @desc    Add nutrition log
// @route   POST /api/nutrition
// @access  Private
const addNutritionLog = async (req, res) => {
    const { mealType, foodItem, calories, protein, carbs, fats, date } = req.body;

    if (!mealType || !foodItem || !calories) {
        res.status(400);
        throw new Error('Please add all required fields');
    }

    const log = await Nutrition.create({
        user: req.user.id,
        mealType,
        foodItem,
        calories,
        protein,
        carbs,
        fats,
        date: date || Date.now()
    });

    res.status(201).json(log);
};

// @desc    Delete nutrition log
// @route   DELETE /api/nutrition/:id
// @access  Private
const deleteNutritionLog = async (req, res) => {
    const log = await Nutrition.findById(req.params.id);

    if (!log) {
        res.status(404);
        throw new Error('Nutrition log not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the log user
    if (log.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await log.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getNutritionLogs,
    addNutritionLog,
    deleteNutritionLog
};
