const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user');
const { generateToken } = require('./jwt');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://mad4movies.onrender.com/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                user.googleId = profile.id;
                await user.save();
            } else {
                user = await new User({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    username: profile.emails[0].value.split('@')[0] + Date.now().toString().slice(-4),
                    isVerified: true
                }).save();
            }
        }

        const token = generateToken({
            _id: user._id,
            isVerified: user.isVerified
        });

        done(null, {
            ...user.toObject(),
            token
        });
    } catch (error) {
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, {
        id: user._id,
        token: user.token
    });
});

passport.deserializeUser(async (obj, done) => {
    try {
        const user = await User.findById(obj.id);
        done(null, {
            ...user.toObject(),
            token: obj.token
        });
    } catch (error) {
        done(error);
    }
});

module.exports = passport;