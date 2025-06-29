const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { jwtAuthMiddleware } = require('../jwt');

router.get('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const findUserEmail = await User.findOne({ username: username });

        if (!findUserEmail) {
            return res.status(404).json({ error: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = findUserEmail.toObject();
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true }).select('-password');
        if (!userId) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;