const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please add a workout name']
    },
    date: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number, // in minutes
        required: [true, 'Please add duration in minutes']
    },
    calories: {
        type: Number,
        required: [true, 'Please add calories burned']
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending', 'Skipped'],
        default: 'Completed'
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
