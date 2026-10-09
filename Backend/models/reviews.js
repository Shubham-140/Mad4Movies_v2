const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    review: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "",
    },
    movieId: {
        type: Number,
        required: true,
        index: true
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    likes: {
        type: Number,
        default: 0,
        min: 0,
        get: function () { return this.likedBy.length; }
    },
    dislikes: {
        type: Number,
        default: 0,
        min: 0,
        get: function () { return this.dislikedBy.length; }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    reviewId: {
        type: String,
        unique: true,
        default: () => nanoid(10) // Generates a 10-character unique ID
    }
}, { toJSON: { getters: true } });

module.exports = mongoose.model('Reviews', reviewsSchema);