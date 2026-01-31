const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        // Mock Quests if empty (Life-as-a-Game instantiation)
        if (!user.dailyQuests || user.dailyQuests.length === 0) {
            user.dailyQuests = [
                { title: 'Morning Protocol: 10m Meditation', xp: 50, type: 'Mind', completed: false },
                { title: 'Hydration: 2L Water Intake', xp: 30, type: 'Recovery', completed: false },
                { title: 'Strength: Complete Upper PUSH', xp: 100, type: 'Physique', completed: false }
            ];
            await user.save();
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            level: user.level,
            xp: user.xp,
            profile: user.profile,
            fitnessGoals: user.fitnessGoals,
            dailyQuests: user.dailyQuests,
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
            user.profile = {
                ...user.profile,
                ...req.body.profile,
                // Ensure nested update for neuroStats if provided
                neuroStats: {
                    ...user.profile.neuroStats,
                    ...(req.body.profile.neuroStats || {})
                }
            };
        }

        if (req.body.fitnessGoals) {
            user.fitnessGoals = req.body.fitnessGoals;
        }

        if (req.body.dailyQuests) {
            user.dailyQuests = req.body.dailyQuests;
        }

        // Gamification Logic: Auto-calculate level if XP is updated manually (e.g. via workouts in future)
        // For now, we trust the update from client or internal logic.
        if (req.body.xp) {
            user.xp = req.body.xp;
            // Simple Level Formula: Level 1 -> 0-999 XP, Level 2 -> 1000-1999 XP, etc.
            user.level = Math.floor(user.xp / 1000) + 1;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            level: updatedUser.level,
            xp: updatedUser.xp,
            profile: updatedUser.profile,
            fitnessGoals: updatedUser.fitnessGoals,
            dailyQuests: updatedUser.dailyQuests,
            token: req.body.token
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = { getUserProfile, updateUserProfile };
