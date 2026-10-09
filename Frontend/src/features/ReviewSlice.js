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
    async ({ movieId, review, userId, name }, { getState, rejectWithValue }) => {
        try {
            const { currentUser } = getState().auth;
            const resolvedUserId = userId || currentUser?._id || currentUser?.id;
            if (!resolvedUserId) {
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
                    userId: resolvedUserId,
                    movieId: Number(movieId),
                    review,
                    name: name || currentUser?.name || "",
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
    async ({ reviewId, newReview, movieId }, { rejectWithValue }) => {
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

function applyReactionToggle(review, userId, reactionType) {
    if (!review) return;
    const userIdStr = String(userId);
    const hasLike = review.likedBy.some((id) => String(id) === userIdStr);
    const hasDislike = review.dislikedBy.some(
        (id) => String(id) === userIdStr
    );

    if (reactionType === "like") {
        review.dislikedBy = review.dislikedBy.filter(
            (id) => String(id) !== userIdStr
        );
        review.likedBy = hasLike
            ? review.likedBy.filter((id) => String(id) !== userIdStr)
            : [...review.likedBy, userIdStr];
    } else {
        review.likedBy = review.likedBy.filter(
            (id) => String(id) !== userIdStr
        );
        review.dislikedBy = hasDislike
            ? review.dislikedBy.filter((id) => String(id) !== userIdStr)
            : [...review.dislikedBy, userIdStr];
    }
}

function findReview(state, reviewId, movieId) {
    if (movieId != null && state.reviews[Number(movieId)]?.[reviewId]) {
        return state.reviews[Number(movieId)][reviewId];
    }
    for (const key in state.reviews) {
        if (state.reviews[key][reviewId]) {
            return state.reviews[key][reviewId];
        }
    }
    return null;
}

export const toggleReviewReaction = createAsyncThunk(
    "reviews/toggleReaction",
    async ({ reviewId, action, userId }, { getState, rejectWithValue }) => {
        try {
            const { currentUser } = getState().auth;
            const resolvedUserId =
                userId || currentUser?._id || currentUser?.id;
            if (!resolvedUserId) {
                return rejectWithValue({ error: "Not logged in" });
            }
            const response = await fetch(apiUrl(`/reviews/update/like/${reviewId}`), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: resolvedUserId,
                    action
                }),
            });
            await handleFetchResponse(response);
            return { reviewId, userId: resolvedUserId, action };
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const deleteReview = createAsyncThunk(
    "reviews/deleteReview",
    async (payload, { rejectWithValue }) => {
        try {
            const reviewId =
                typeof payload === "string" || typeof payload === "number"
                    ? payload
                    : payload?.reviewId;
            if (!reviewId) {
                return rejectWithValue({ error: "Missing review id" });
            }
            const response = await fetch(
                apiUrl(`/reviews/delete/${reviewId}`),
                {
                    method: "DELETE",
                }
            );
            await handleFetchResponse(response);
            return {
                reviewId,
                movieId:
                    typeof payload === "object" ? payload?.movieId : undefined,
            };
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
                const key = Number(movieId);
                state.reviews[key] = reviews.reduce((acc, review) => {
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
                const key = Number(review.movieId);
                if (!state.reviews[key]) {
                    state.reviews[key] = {};
                }
                state.reviews[key][review.reviewId] = {
                    ...review,
                    movieId: key,
                    likedBy: (review.likedBy || []).map((id) => String(id)),
                    dislikedBy: (review.dislikedBy || []).map((id) =>
                        String(id)
                    ),
                };
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.status = "failed";
                state.error =
                    action.payload?.error ||
                    action.payload?.message ||
                    "Failed to create review";
            })

            // Update Review Text — optimistic so UI doesn't flash old text
            .addCase(updateReviewText.pending, (state, action) => {
                const { reviewId, newReview, movieId } = action.meta.arg;
                const target = findReview(state, reviewId, movieId);
                if (target) {
                    target._previousReview = target.review;
                    target.review = newReview;
                    target.isEdited = true;
                }
            })
            .addCase(updateReviewText.fulfilled, (state, action) => {
                const updatedReview = action.payload;
                const movieId = Number(updatedReview.movieId);
                const reviewId = updatedReview.reviewId;
                if (state.reviews[movieId]?.[reviewId]) {
                    state.reviews[movieId][reviewId].review =
                        updatedReview.review;
                    state.reviews[movieId][reviewId].isEdited = true;
                    delete state.reviews[movieId][reviewId]._previousReview;
                }
            })
            .addCase(updateReviewText.rejected, (state, action) => {
                const { reviewId, movieId } = action.meta.arg;
                const target = findReview(state, reviewId, movieId);
                if (target && target._previousReview != null) {
                    target.review = target._previousReview;
                    delete target._previousReview;
                }
            })

            // Like/Dislike — optimistic for instant UI
            .addCase(toggleReviewReaction.pending, (state, action) => {
                const { reviewId, action: reactionType, userId } =
                    action.meta.arg;
                if (!userId) return;
                const target = findReview(state, reviewId);
                applyReactionToggle(target, userId, reactionType);
            })
            .addCase(toggleReviewReaction.rejected, (state, action) => {
                const { reviewId, action: reactionType, userId } =
                    action.meta.arg;
                if (!userId) return;
                // Undo optimistic toggle
                const target = findReview(state, reviewId);
                applyReactionToggle(target, userId, reactionType);
            })

            // Delete Review — optimistic
            .addCase(deleteReview.pending, (state, action) => {
                const payload = action.meta.arg;
                const reviewId =
                    typeof payload === "string" || typeof payload === "number"
                        ? payload
                        : payload?.reviewId;
                const movieId =
                    typeof payload === "object" ? payload?.movieId : undefined;
                if (!reviewId) return;

                const key =
                    movieId != null && state.reviews[Number(movieId)]
                        ? Number(movieId)
                        : Object.keys(state.reviews).find(
                              (k) => state.reviews[k][reviewId]
                          );
                if (key == null || !state.reviews[key]?.[reviewId]) return;

                state._deletedReviewBackup = {
                    key,
                    reviewId,
                    review: state.reviews[key][reviewId],
                };
                delete state.reviews[key][reviewId];
                if (Object.keys(state.reviews[key]).length === 0) {
                    delete state.reviews[key];
                }
            })
            .addCase(deleteReview.fulfilled, (state) => {
                state._deletedReviewBackup = null;
            })
            .addCase(deleteReview.rejected, (state) => {
                const backup = state._deletedReviewBackup;
                if (!backup) return;
                if (!state.reviews[backup.key]) {
                    state.reviews[backup.key] = {};
                }
                state.reviews[backup.key][backup.reviewId] = backup.review;
                state._deletedReviewBackup = null;
            });
    }
});

// Selectors
export const selectReviewsByMovieId = (state, movieId) =>
    state.reviews?.reviews?.[Number(movieId)] || {};

export const selectReviewStatus = (state) => state.reviews?.status;
export const selectReviewError = (state) => state.reviews?.error;

export default reviewsSlice.reducer;