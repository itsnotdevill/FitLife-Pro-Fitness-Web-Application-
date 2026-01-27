const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile,
            fitnessGoals: user.fitnessGoals,
            assignedTrainer: user.assignedTrainer
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Update profile stats
        if (req.body.profile) {
            user.profile = { ...user.profile, ...req.body.profile };
        }

        if (req.body.fitnessGoals) {
            user.fitnessGoals = req.body.fitnessGoals;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profile: updatedUser.profile,
            fitnessGoals: updatedUser.fitnessGoals,
            token: req.body.token // Keep existing token or generate new if needed (usually unrelated here)
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { getUserProfile, updateUserProfile };
