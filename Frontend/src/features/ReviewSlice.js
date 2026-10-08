import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../utils/api";

const initialState = {
    reviews: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// Helper function to handle fetch responses
const handleFetchResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw errorData;
    }
    return response.json();
};

// Async Thunks
export const fetchReviews = createAsyncThunk(
    "reviews/fetchReviews",
    async (movieId, { rejectWithValue }) => {
        try {
            const response = await fetch(
                apiUrl(`/reviews/${Number(movieId)}`)
            );
            const data = await handleFetchResponse(response);
            return { movieId, reviews: data.reviews || [] };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const createReview = createAsyncThunk(
    "reviews/createReview",
    async ({ movieId, review }, { getState, rejectWithValue }) => {
        try {
            const { currentUser } = getState().auth;
            const response = await fetch(apiUrl("/reviews/create"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    movieId: Number(movieId),
                    review,
                    name: currentUser.name,
                }),
            });
            const data = await handleFetchResponse(response);
            return data.review;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const updateReviewText = createAsyncThunk(
    "reviews/updateReviewText",
    async ({ reviewId, newReview }, { rejectWithValue }) => {
        try {
            const response = await fetch(apiUrl(`/reviews/update/review/${reviewId}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ newReview }),
            });
            const data = await handleFetchResponse(response);
            return data.review;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const toggleReviewReaction = createAsyncThunk(
    "reviews/toggleReaction",
    async ({ reviewId, action }, { getState, rejectWithValue }) => {
        try {
            const { currentUser } = getState().auth;
            const response = await fetch(apiUrl(`/reviews/update/like/${reviewId}`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    action
                }),
            });
            await handleFetchResponse(response);
            return { reviewId, userId: currentUser._id, action };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (reviewId, { rejectWithValue }) => {
        try {
            const response = await fetch(apiUrl(`/reviews/delete/${reviewId}`), {
                method: "DELETE"
            });
            await handleFetchResponse(response);
            return reviewId;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Reviews
            .addCase(fetchReviews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                const { movieId, reviews } = action.payload;
                state.reviews[movieId] = reviews.reduce((acc, review) => {
                    acc[review.reviewId] = {
                        ...review,
                        movieId: Number(review.movieId),
                        likedBy: (review.likedBy || []).map((id) => String(id)),
                        dislikedBy: (review.dislikedBy || []).map((id) =>
                            String(id)
                        ),
                    };
                    return acc;
                }, {});
                state.status = "succeeded";
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.error || "Failed to fetch reviews";
            })

            // Create Review
            .addCase(createReview.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createReview.fulfilled, (state, action) => {
                const review = action.payload;
                if (!state.reviews[review.movieId]) {
                    state.reviews[review.movieId] = {};
                }
                state.reviews[review.movieId][review.reviewId] = {
                    ...review,
                    movieId: Number(review.movieId),
                    likedBy: (review.likedBy || []).map((id) => String(id)),
                    dislikedBy: (review.dislikedBy || []).map((id) =>
                        String(id)
                    ),
                };
                state.status = "succeeded";
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.error || "Failed to create review";
            })

            // Update Review Text
            .addCase(updateReviewText.fulfilled, (state, action) => {
                const updatedReview = action.payload;
                const movieId = updatedReview.movieId;
                const reviewId = updatedReview.reviewId;
                
                if (state.reviews[movieId]?.[reviewId]) {
                    state.reviews[movieId][reviewId] = {
                        ...state.reviews[movieId][reviewId],
                        review: updatedReview.review,
                        isEdited: true
                    };
                }
            })

            // Toggle Like/Dislike
            .addCase(toggleReviewReaction.fulfilled, (state, action) => {
                const { reviewId, userId, action: reactionType } = action.payload;
                
                // Find the review in state
                for (const movieId in state.reviews) {
                    if (state.reviews[movieId][reviewId]) {
                        const review = state.reviews[movieId][reviewId];
                        
                        // Handle like/dislike toggle
                        const userIdStr = String(userId);
                        const hasLike = review.likedBy.some(
                            (id) => String(id) === userIdStr
                        );
                        const hasDislike = review.dislikedBy.some(
                            (id) => String(id) === userIdStr
                        );

                        if (reactionType === "like") {
                            review.dislikedBy = review.dislikedBy.filter(
                                (id) => String(id) !== userIdStr
                            );
                            review.likedBy = hasLike
                                ? review.likedBy.filter(
                                      (id) => String(id) !== userIdStr
                                  )
                                : [...review.likedBy, userId];
                        } else {
                            review.likedBy = review.likedBy.filter(
                                (id) => String(id) !== userIdStr
                            );
                            review.dislikedBy = hasDislike
                                ? review.dislikedBy.filter(
                                      (id) => String(id) !== userIdStr
                                  )
                                : [...review.dislikedBy, userId];
                        }
                        break;
                    }
                }
            })

            // Delete Review
            .addCase(deleteReview.fulfilled, (state, action) => {
                const reviewId = action.payload;
                
                // Find and delete the review
                for (const movieId in state.reviews) {
                    if (state.reviews[movieId][reviewId]) {
                        delete state.reviews[movieId][reviewId];
                        
                        // Clean up empty movieId entries
                        if (Object.keys(state.reviews[movieId]).length === 0) {
                            delete state.reviews[movieId];
                        }
                        break;
                    }
                }
            });
    }
});

// Selectors
export const selectReviewsByMovieId = (state, movieId) => 
    state.reviews?.reviews?.[movieId] || {};

export const selectReviewStatus = (state) => state.reviews.status;
export const selectReviewError = (state) => state.reviews.error;

export default reviewsSlice.reducer;