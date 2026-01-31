const mongoose = require('mongoose');

const aiProfileSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

    // Behavioral Psychology Layer
    behavioralType: {
        type: String,
        enum: ['Discipline-Driven', 'Motivation-Reliant', 'Social-Seeker', 'Data-Obsessed', 'Unprofiled'],
        default: 'Unprofiled'
    },
    motivationScore: { type: Number, default: 50 }, // 0-100 (Dynamic)
    consistencyStreak: { type: Number, default: 0 },

    // Procrastination Detection
    lastLogin: { type: Date },
    missedWorkoutsCount: { type: Number, default: 0 },
    burnoutRisk: { type: Number, default: 0 }, // 0-100

    // AI Preferences
    communicationStyle: {
        type: String,
        enum: ['Drill Sergeant', 'Empathetic Coach', 'Stoic Philosopher', 'Data Analyst'],
        default: 'Data Analyst'
    },
    interventionLevel: {
        type: String,
        enum: ['High', 'Medium', 'Low', 'Passive'],
        default: 'Medium'
    },

    // Digital Monitor
    screenTimeDaily: { type: Number, default: 0 }, // minutes (if integrated)
    sleepQualityAverage: { type: Number, default: 0 },

    // Neuro Stats (Added for NeuroFitness)
    neuroStats: {
        focusScore: { type: Number, default: 0 },
        reactionTime: { type: Number, default: 0 },
        stressLevel: { type: Number, default: 0 }
    }

}, {
    timestamps: true
});

const AIProfile = mongoose.model('AIProfile', aiProfileSchema);

module.exports = AIProfile;
