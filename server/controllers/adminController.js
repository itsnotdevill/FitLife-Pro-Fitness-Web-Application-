const User = require('../models/User');
const Workout = require('../models/Workout');
const Nutrition = require('../models/Nutrition');
const HealthMetric = require('../models/HealthMetric'); // Assuming this model exists

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTrainers = await User.countDocuments({ role: 'trainer' });
        const totalWorkouts = await Workout.countDocuments();

        // Get recent 5 users
        const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');

        // Get all users with full details
        const allUsers = await User.find().select('-password').sort({ createdAt: -1 });

        res.json({
            stats: {
                totalUsers,
                totalTrainers,
                totalWorkouts
            },
            recentUsers,
            allUsers
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

// @desc    Get All System Data (For Explorer)
// @route   GET /api/admin/data
// @access  Private/Admin
const getAllData = async (req, res) => {
    try {
        const { collection } = req.query;
        let data = [];

        if (collection === 'workouts') {
            data = await Workout.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(50);
        } else if (collection === 'nutrition') {
            data = await Nutrition.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(50);
        } else if (collection === 'health') {
            data = await HealthMetric.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(50);
        }

        res.json(data);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

module.exports = {
    getAdminStats,
    getAllData
};
