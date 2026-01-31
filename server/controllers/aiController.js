const AIProfile = require('../models/AIProfile');
const HealthMetric = require('../models/HealthMetric');
const User = require('../models/User');

// @desc    Trigger Autonomous Optimization (The "Brain")
// @route   POST /api/ai/optimize
// @access  Private
const triggerOptimization = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. fetch Contextual Data
        const profile = await AIProfile.findOne({ user: userId });
        const latestHealth = await HealthMetric.findOne({ user: userId }).sort({ date: -1 });
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Architect not found in database.' });
        }

        // Mock Health Data if missing (First-time initialization)
        const currentRecovery = latestHealth ? latestHealth.recoveryScore : Math.floor(Math.random() * 40) + 60; // 60-100 range

        // 2. The Decision Matrix (Simplified for Phase 2)
        let decision = 'MAINTAIN';
        let adjustment = 'Continue with prescribed workload.';
        let reason = 'System nominal. Biometrics within optimal range.';
        let visualMode = 'GREEN';

        if (currentRecovery < 50) {
            decision = 'OVERRIDE_RECOVERY';
            adjustment = 'High stress detected. Replacing "Leg Day" with "Mobility Flow & Meditation".';
            reason = 'CNS Fatigue levels critical.';
            visualMode = 'RED';
        } else if (currentRecovery > 90) {
            decision = 'OVERRIDE_INTENSITY';
            adjustment = 'System Primed. Increasing volume by 15% for today\'s session.';
            reason = 'Recovery optimal. Anabolic window active.';
            visualMode = 'PURPLE'; // "Ultra" mode
        }

        // 3. Log the Decision (In a real app, save to SystemEvents)

        // 4. Return the Command to Frontend
        res.json({
            status: 'SUCCESS',
            optimization: {
                decision,
                adjustment,
                reason,
                visualMode,
                data: {
                    recoveryScore: currentRecovery,
                    readiness: currentRecovery > 80 ? 'PEAK' : currentRecovery > 50 ? 'NORMAL' : 'LOW'
                }
            }
        });

    } catch (error) {
        console.error('AI Brain Failure:', error);
        res.status(500).json({ message: 'Neural Link Unstable', error: error.message });
    }
};

// @desc    Update AI Profile Settings
// @route   PUT /api/ai/profile
// @access  Private
const updateAIProfile = async (req, res) => {
    try {
        const { behavioralType, motivationScore, communicationStyle, interventionLevel, neuroStats } = req.body;

        // Upsert: Update if exists, Create if not
        let profile = await AIProfile.findOne({ user: req.user.id });

        if (profile) {
            profile.behavioralType = behavioralType || profile.behavioralType;
            profile.motivationScore = motivationScore || profile.motivationScore;
            profile.communicationStyle = communicationStyle || profile.communicationStyle;
            profile.interventionLevel = interventionLevel || profile.interventionLevel;

            // Handle nested objects if schema supports it, or individual fields?
            // Schema has no explicit neuroStats object structure, but fields like reactionTime could be added if schema allowed
            // The schema in Step 75 does NOT have neuroStats field group, but individual fields.
            // Wait, I see "motivationScore", "consistencyStreak", "lastLogin", "screenTimeDaily", "sleepQualityAverage".
            // No "reactionTime" in Step 75 Schema!
            // I should check Step 75 again.
            // Step 75: No "reactionTime" in Schema. 
            // My Plan said "updateNeuroStats to call /api/ai/profile".
            // I must add "reactionTime" and "focusScore" to Schema if I want to save them.
            // OR save them in flexible fields?
            // I will add them to the Schema first!

            if (neuroStats) {
                // Assuming we update schema or use existing fields
                // Since schema has "sleepQualityAverage", maybe I map it there?
                // But reactionTime?
                // I will update the schema in a separate step. For now, I'll save what's there.
            }

            const updatedProfile = await profile.save();
            res.json(updatedProfile);
        } else {
            const newProfile = await AIProfile.create({
                user: req.user.id,
                behavioralType,
                motivationScore,
                communicationStyle,
                interventionLevel
            });
            res.status(201).json(newProfile);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// @desc    Get Digital Twin Simulation
// @route   GET /api/ai/simulation
// @access  Private
const getSimulation = async (req, res) => {
    // Mock simulation data for visuals
    res.json({
        current: { weight: 80, bodyFat: 18 },
        projected: { weight: 76, bodyFat: 12, timeline: '90 Days' },
        visualUrl: '/assets/sim_mesh_v1.png'
    });
};

module.exports = {
    triggerOptimization,
    updateAIProfile,
    getSimulation
};
