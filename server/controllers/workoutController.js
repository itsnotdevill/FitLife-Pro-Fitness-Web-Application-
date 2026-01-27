const Workout = require('../models/Workout');

// @desc    Get user workouts
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
const createWorkout = async (req, res) => {
    const { name, duration, calories, date, status, notes } = req.body;

    if (!name || !duration || !calories) {
        return res.status(400).json({ message: 'Please add all required fields' });
    }

    try {
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
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);

        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the workout user
        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await workout.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getWorkouts,
    createWorkout,
    deleteWorkout
};
