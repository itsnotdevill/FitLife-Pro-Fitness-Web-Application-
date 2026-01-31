const Workout = require('../models/Workout');

// @desc    Get user workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(workouts);
};

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
    const { name, duration, calories, date, status, notes } = req.body;

    if (!name || !duration || !calories) {
        res.status(400);
        throw new Error('Please add all required fields');
    }

    const workout = await Workout.create({
        user: req.user.id,
        name,
        duration,
        calories,
        date: date || Date.now(),
        status: status || 'Completed',
        notes
    });

    res.status(201).json(workout);
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
        res.status(404);
        throw new Error('Workout not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the workout user
    if (workout.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await workout.deleteOne();

    res.status(200).json({ id: req.params.id });
};

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout
};
