import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "../utils/api";

const initialState = {
    reviews: {},
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    reactionSnapshots: {},
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
            const response = await fetch(apiUrl(`/reviews/${movieId}`));
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
            if (!currentUser?._id) {
                return rejectWithValue({ error: "You must be logged in to comment" });
            }
            if (!movieId) {
                return rejectWithValue({ error: "Missing movie id" });
            }
            const response = await fetch(apiUrl("/reviews/create"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: currentUser._id,
                    movieId: Number(movieId),
                    review,
                    name: currentUser.name || ""
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
            if (!currentUser?._id) {
                return rejectWithValue({ error: "You must be logged in to react" });
            }
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
            return await handleFetchResponse(response);
        } catch (err) {
            return rejectWithValue(err);
        }
    },
    {
        getPendingMeta: (_, { getState }) => ({
            userId: getState().auth.currentUser?._id
        })
    }
);

export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (reviewId, { rejectWithValue }) => {
        try {
            if (!reviewId) {
                return rejectWithValue({ error: "Missing review id" });
            }
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

const findReview = (state, reviewId) => {
    for (const movieId in state.reviews) {
        if (state.reviews[movieId][reviewId]) return state.reviews[movieId][reviewId];
    }
    return null;
};

const applyReactionToggle = (review, userId, reactionType) => {
    const userIdStr = String(userId);
    const target = reactionType === "like" ? "likedBy" : "dislikedBy";
    const opposite = reactionType === "like" ? "dislikedBy" : "likedBy";
    const alreadyReacted = review[target].some((id) => String(id) === userIdStr);
    review[opposite] = review[opposite].filter((id) => String(id) !== userIdStr);
    review[target] = alreadyReacted
        ? review[target].filter((id) => String(id) !== userIdStr)
        : [...review[target], userId];
};

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
                        likedBy: review.likedBy || [],
                        dislikedBy: review.dislikedBy || []
                    };
                    return acc;
                }, {});
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.error || "Failed to fetch reviews";
            })

            // Create Review
            .addCase(createReview.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                const review = action.payload;
                if (!state.reviews[review.movieId]) {
                    state.reviews[review.movieId] = {};
                }
                state.reviews[review.movieId][review.reviewId] = {
                    ...review,
                    likedBy: [],
                    dislikedBy: []
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
            .addCase(toggleReviewReaction.pending, (state, action) => {
                const { reviewId, action: reactionType } = action.meta.arg;
                const userId = action.meta.userId;
                const review = findReview(state, reviewId);
                if (!review || !userId) return;
                state.reactionSnapshots[action.meta.requestId] = {
                    reviewId,
                    likedBy: [...review.likedBy],
                    dislikedBy: [...review.dislikedBy]
                };
                applyReactionToggle(review, userId, reactionType);
            })
            .addCase(toggleReviewReaction.fulfilled, (state, action) => {
                delete state.reactionSnapshots[action.meta.requestId];
            })
            .addCase(toggleReviewReaction.rejected, (state, action) => {
                const snapshot = state.reactionSnapshots[action.meta.requestId];
                if (snapshot) {
                    const review = findReview(state, snapshot.reviewId);
                    if (review) {
                        review.likedBy = snapshot.likedBy;
                        review.dislikedBy = snapshot.dislikedBy;
                    }
                    delete state.reactionSnapshots[action.meta.requestId];
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

export const selectReviewStatus = (state) => state.reviews?.status;
export const selectReviewError = (state) => state.reviews?.error;

export default reviewsSlice.reducer;