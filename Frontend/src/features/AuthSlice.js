import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const handleLogin = createAsyncThunk('user/login', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await fetch('https://mad4movies.onrender.com/auth/login', {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            return rejectWithValue('Invalid Credentials');
        }

        const data = await response.json();
        const token = data?.token;
        console.log(data?.user);
        localStorage.setItem('auth_token', JSON.stringify(token));
        return data?.user;
    } catch (error) {
        localStorage.removeItem('auth_token');
        rejectWithValue(error);
    }
})

export const saveUserDetails = createAsyncThunk(
    'user/updateData',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://mad4movies.onrender.com/user/update/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorization': `Bearer ${localStorage.getItem('auth_token')}` // If using JWT
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json(); // Parse JSON response

            if (!response.ok) {
                return rejectWithValue(data); // Use server error response
            }

            return data; // Return parsed JSON data
        } catch (error) {
            return rejectWithValue(error.message || 'Update failed');
        }
    }
);

export const handleGoogleAuth = createAsyncThunk('user/google-auth', async (_, { rejectWithValue }) => {
    try {
        window.location.href = 'https://mad4movies.onrender.com/auth/google';
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const handleSignup = createAsyncThunk('user/signup', async ({ username, password, name, email }, { dispatch, rejectWithValue }) => {
    try {
        const response = await fetch('https://mad4movies.onrender.com/auth/signup', {
            method: "POST",
            body: JSON.stringify({ name, username, email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials:'include'
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        await dispatch(handleLogin({
            username,
            password
        }))
    } catch (error) {
        rejectWithValue(error);
    }
})

const initialState = {
    isLoggedIn: false,
    showPopup: false,
    loginWindow: false,
    signupWindow: false,
    resetEmail: '',
    userMenuSelected: false,
    currentUser: null,
    loading: false,
    error: false
}

export const AuthSlice = createSlice({
    name: 'AuthSlice',
    initialState,
    reducers: {
        setShowPopup: (state, action) => {
            state.showPopup = action.payload;
        },
        setLoginWindow: (state, action) => {
            state.loginWindow = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setSignupWindow: (state, action) => {
            state.signupWindow = action.payload;
        },
        setResetEmail: (state, action) => {
            state.resetEmail = action.payload;
        },
        setUserMenuSelected: (state, action) => {
            state.userMenuSelected = action.payload;
        },
        extraReducerLogin: (builder) => {
            builder
                .addCase(handleLogin.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(handleLogin.fulfilled, (state, action) => {
                    state.currentUser = action.payload;
                    state.loading = true;
                    state.manualLogin = true;
                })
                .addCase(handleLogin.rejected, (state, action) => {
                    state.error = action.payload;
                    state.loading = false;
                })
                .addCase(saveUserDetails.fulfilled, (state, action) => {
                    state.currentUser = {
                        ...state.currentUser,
                        ...action.payload 
                    };
                })
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        handleLogout: (state) => {
            const token = localStorage.getItem("auth_token");
            if (token) {
                localStorage.removeItem('auth_token');
                state.currentUser = null;
            }
        },
    }
})

export const { setShowPopup, setLoginWindow, setIsLoggedIn, setSignupWindow, setResetEmail, setUserMenuSelected, setCurrentUser, handleLogout } = AuthSlice.actions;
export default AuthSlice.reducer; 