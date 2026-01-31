const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    profile: {
        age: { type: Number },
        height: { type: Number }, // Value stored
        heightUnit: { type: String, enum: ['cm', 'ft'], default: 'cm' },
        weight: { type: Number }, // Value stored
        weightUnit: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
        bmi: { type: Number },
        bodyType: { type: String, enum: ['Ectomorph', 'Mesomorph', 'Endomorph', 'None'], default: 'None' },
        recoveryScore: { type: Number, default: 100 },
        neuroStats: {
            focusScore: { type: Number, default: 75 },
            stressLevel: { type: Number, default: 20 }, // 0-100
            reactionTime: { type: Number, default: 300 } // ms
        }
    },
    assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fitnessGoals: [{ type: String }],
    dailyQuests: [{
        title: { type: String },
        xp: { type: Number },
        completed: { type: Boolean, default: false },
        type: { type: String, enum: ['Physique', 'Mind', 'Recovery'], default: 'Physique' }
    }],
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
