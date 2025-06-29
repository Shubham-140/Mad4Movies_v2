import { configureStore } from "@reduxjs/toolkit";
import colorReducer from '../features/ColorSlice';
import authReducer from '../features/AuthSlice';
import faqReducer from '../features/FAQSlice';
import reviewReducer from '../features/ReviewSlice';
import movieDetailsReducer from '../features/MovieDetailsSlice';

const store = configureStore({
    reducer: {
        color: colorReducer,
        auth: authReducer,
        faq: faqReducer,
        review: reviewReducer,
        movieDetails: movieDetailsReducer,
    }
});

export default store;