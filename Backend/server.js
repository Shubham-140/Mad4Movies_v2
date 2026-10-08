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

const allowedOrigins = [
    'http://localhost:5173',
    'https://mad4movies.vercel.app',
    process.env.FRONTEND_URL,
].filter(Boolean);

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

function resolveFrontendReturnUrl(candidate) {
    if (candidate && allowedOrigins.includes(candidate)) {
        return candidate;
    }
    return process.env.FRONTEND_URL || 'https://mad4movies.vercel.app';
}

const passport = require('./passport');
app.use(passport.initialize());
// Remove passport.session() since we're using tokens
// app.use(passport.session());

// Google OAuth Routes
app.get('/auth/google', (req, res, next) => {
    const returnTo = resolveFrontendReturnUrl(req.query.returnTo);
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
        state: returnTo,
    })(req, res, next);
});

app.get('/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        const token = generateToken(req.user);
        const returnTo = resolveFrontendReturnUrl(req.query.state);
        res.redirect(`${returnTo}?token=${encodeURIComponent(token)}`);
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