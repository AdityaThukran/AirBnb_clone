const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new schema({
    comment: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    cleanliness: { type: Number, min: 1, max: 5 },
    accuracy: { type: Number, min: 1, max: 5 },
    communication: { type: Number, min: 1, max: 5 },
    location: { type: Number, min: 1, max: 5 },
    checkIn: { type: Number, min: 1, max: 5 },
    value: { type: Number, min: 1, max: 5 },
    created_at: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Review', reviewSchema);
