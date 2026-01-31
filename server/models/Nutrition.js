const mongoose = require('mongoose');

const nutritionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    mealType: {
        type: String,
        required: [true, 'Please add a meal type'],
        enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
    },
    foodItem: {
        type: String,
        required: [true, 'Please add a food item']
    },
    calories: {
        type: Number,
        required: [true, 'Please add calories']
    },
    protein: {
        type: Number,
        default: 0
    },
    carbs: {
        type: Number,
        default: 0
    },
    fats: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Nutrition', nutritionSchema);
