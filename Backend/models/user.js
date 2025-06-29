const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"]
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId;
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
        index: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    joinedOn: {
        type: Date,
        default: Date.now,
    },
    age: {
        type: Number,
        min: 0
    },
    description: {
        type: String,
        default: "I am Mad4Movies."
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other", null],
        default: null
    },
    country: {
        type: String,
        default: "Unknown"
    },
    preferredLanguage: {
        type: String,
        default: "Unknown"
    },
    favMovie: {
        type: String,
        default: "Unknown"
    },
    favArtist: {
        type: String,
        default: "Unknown"
    },
    favCharacter: {
        type: String,
        default: "Unknown"
    },
    watchList: {
        type: [Number],
        default: []
    },
    recentlyViewed: {
        type: [Number],
        default: []
    },
    favorites: {
        type: [Number],
        default: []
    },
    watched: {
        type: [Number],
        default: []
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        trim: true,
        lowercase: true,
        required: true
    },
    ratings: {
        type: Map,
        of: {
            type: Number,
            min: 1,
            max: 10
        },
        default: {}
    }

})

userSchema.methods.comparePassword = async function (userPassword) {
    const user = this;

    try {
        if (!user.password) {
            return false;
        }
        const password = user.password;
        const isPasswordMatched = await bcrypt.compare(userPassword, password);
        return isPasswordMatched;
    } catch (error) {
        throw error;
    }
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.password || user.isModified('password') === false || user.googleId) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;