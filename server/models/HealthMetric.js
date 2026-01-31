const mongoose = require('mongoose');

const healthMetricSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Time-Series Data Point
    date: { type: Date, default: Date.now },
    timestamp: { type: Number, default: () => Date.now() },

    // Metrics
    heartRateResting: { type: Number },
    heartRateVariability: { type: Number }, // HRV
    sleepHours: { type: Number },
    sleepQualityScore: { type: Number }, // 1-100
    stressLevel: { type: Number }, // 1-100

    // Recovery Intelligence
    recoveryScore: { type: Number }, // Calculated by AI
    readinessToTrain: { type: Number }, // 1-100

    // Source (e.g., 'Apple Watch', 'Manual', 'Oura')
    source: { type: String, default: 'Manual' }
}, {
    timestamps: true
});

// Index for fast time-range querying
healthMetricSchema.index({ user: 1, date: -1 });

const HealthMetric = mongoose.model('HealthMetric', healthMetricSchema);

module.exports = HealthMetric;
