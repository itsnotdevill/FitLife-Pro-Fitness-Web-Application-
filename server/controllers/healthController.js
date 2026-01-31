const HealthMetric = require('../models/HealthMetric');

// @desc    Log new health metrics
// @route   POST /api/health
// @access  Private
const logMetric = async (req, res) => {
    const {
        heartRateResting,
        heartRateVariability,
        sleepHours,
        sleepQualityScore,
        stressLevel,
        readinessToTrain
    } = req.body;

    try {
        // Calculate recovery score if not provided
        let recoveryScore = req.body.recoveryScore;
        if (!recoveryScore) {
            // Simple Mock AI Calculation
            recoveryScore = Math.min(100, Math.max(0,
                (sleepQualityScore || 70) * 0.4 +
                (100 - (stressLevel || 50)) * 0.3 +
                ((heartRateVariability || 50) + 20) * 0.3
            ));
        }

        const metric = await HealthMetric.create({
            user: req.user.id,
            heartRateResting,
            heartRateVariability,
            sleepHours,
            sleepQualityScore,
            stressLevel,
            readinessToTrain,
            recoveryScore: Math.round(recoveryScore),
            source: 'Manual'
        });

        res.status(201).json(metric);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// @desc    Get health metrics history
// @route   GET /api/health
// @access  Private
const getMetrics = async (req, res) => {
    try {
        const metrics = await HealthMetric.find({ user: req.user.id })
            .sort({ date: -1 })
            .limit(30); // Last 30 entries
        res.status(200).json(metrics);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
};

module.exports = {
    logMetric,
    getMetrics
};
