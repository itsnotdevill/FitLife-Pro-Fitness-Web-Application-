const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'trainer', 'admin'], default: 'user' },
    profile: {
        age: { type: Number },
        height: { type: Number }, // in cm
        weight: { type: Number }, // in kg
        bmi: { type: Number },
    },
    assignedTrainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fitnessGoals: [{ type: String }],
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
