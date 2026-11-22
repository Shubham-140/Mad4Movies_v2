const express = require('express');
const router = express.Router();
const Reviews = require('../models/reviews');

// Get all reviews for a movie
router.get('/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;

        // Find all reviews for this movie
        const reviews = await Reviews.find({ movieId });

        if (!reviews.length) {
            return res.status(200).json({
                message: "No reviews yet. Be the first to comment!",
                reviews: []
            });
        }

        res.status(200).json({ reviews });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/review/:reviewId', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { newReview } = req.body;

        const updatedReview = await Reviews.findOneAndUpdate(
            { reviewId },
            {
                review: newReview,
                isEdited: true
            },
            { new: true } // Returns the updated document
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ review: updatedReview });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/update/like/:reviewId', async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { userId, action } = req.body;

        if (!["like", "dislike"].includes(action)) {
            return res.status(400).json({ error: "Invalid action (must be 'like' or 'dislike')" });
        }

        const review = await Reviews.findOne({ reviewId });
        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        const target = action === "like" ? review.likedBy : review.dislikedBy;
        const opposite = action === "like" ? review.dislikedBy : review.likedBy;
        const alreadyReacted = target.some((id) => String(id) === String(userId));

        opposite.pull(userId);
        if (alreadyReacted) {
            target.pull(userId);
        } else {
            target.addToSet(userId);
        }

        await review.save();
        res.status(200).json({
            likes: review.likedBy.length,
            dislikes: review.dislikedBy.length
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:reviewId', async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const deletedReview = await Reviews.findOneAndDelete({ reviewId });
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/create', async (req, res) => {
    try {
        const { userId, movieId, review, name } = req.body;

        if (!userId || !movieId || !review) {
            return res.status(400).json({ error: "Missing required fields (userId, movieId, review)" });
        }

        const newReview = new Reviews({
            userId,
            movieId,
            review,
            name: typeof name === "string" ? name.trim() : ""
        });

        await newReview.save();
        res.status(201).json({ review: newReview });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;