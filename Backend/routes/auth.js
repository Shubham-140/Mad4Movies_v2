const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateToken, jwtAuthMiddleware } = require('../jwt');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username});

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const { password: _, ...userWithoutPassword } = user.toObject();
        const token = generateToken(userWithoutPassword);

        res.status(200).json({ user: userWithoutPassword, token: token });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/signup', async (req, res) => {
    try {
        console.log('works here 0');
        const { email, username} = req.body;
        console.log('works here 1');
        
        const user = await User.findOne({ email: email });
        console.log('works here 2');
        if (user) {
            return res.status(409).json({ error: "Email already exists" });
        }

        console.log('works here 3');
        const checkUsername = await User.findOne({ username: username });
        if (checkUsername) {
            return res.status(409).json({ error: "Username already taken" });
        }
        
        console.log('works here 4');
        const newUser = new User(req.body); 
        console.log('works here 5');
        const savedUser = await newUser.save();
        console.log('works here 6');

        const { password: _, ...userWithoutPassword } = savedUser.toObject();
        const token = generateToken(savedUser.toObject()._id);

        res.status(201).json({ user: userWithoutPassword, token: token });
    } catch (error) {
        console.error('SIGNUP ERROR:', error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get('/me', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router;