const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const db = require('./db');
app.use(express.json());
const authRoute = require('./routes/auth');
const userRoute = require('./routes/userRoute');
const reviewsRoute = require('./routes/reviewsRoute');
const { generateToken, jwtAuthMiddleware } = require('./jwt'); // Import jwtAuthMiddleware

// const session = require('express-session');
// app.use(session({ ... }));

const cors = require('cors');
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? 'https://mad4movies.vercel.app'
        : 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const passport = require('./passport');
app.use(passport.initialize());
// Remove passport.session() since we're using tokens
// app.use(passport.session());

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false // Disable sessions
}));

// Updated Google callback route
app.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = generateToken(req.user); // Generate JWT
        res.redirect(`https://mad4movies.vercel.app?token=${token}`); 
    }
);

// Protected route example
app.get('/api/protected', jwtAuthMiddleware, (req, res) => {
    res.json({
        message: "Protected data",
        user: req.user
    });
});

// Auth verification endpoint
app.get('/api/verify-auth', jwtAuthMiddleware, (req, res) => {
    res.json({
        authenticated: true,
        user: req.user
    });
});

// Public route
app.get('/', (req, res) => {
    console.log('hello');
    res.json({ message: "Welcome to Mad4Movies" });
});

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/reviews', reviewsRoute);

app.listen(3000);