import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../utils/api";

export const handleLogin = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(apiUrl("/auth/login"), {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        return rejectWithValue("Invalid Credentials");
      }

      const data = await response.json();
      const token = data?.token;
      localStorage.setItem("auth_token", JSON.stringify(token));
      return data?.user;
    } catch (error) {
      localStorage.removeItem("auth_token");
      return rejectWithValue(error);
    }
  }
);

export const saveUserDetails = createAsyncThunk(
  "user/updateData",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await fetch(apiUrl(`/user/update/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Update failed");
    }
  }
);

export const handleGoogleAuth = createAsyncThunk(
  "user/google-auth",
  async (_, { rejectWithValue }) => {
    try {
      const returnTo = encodeURIComponent(window.location.origin);
      window.location.href = apiUrl(`/auth/google?returnTo=${returnTo}`);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const handleSignup = createAsyncThunk(
  "user/signup",
  async ({ username, password, name, email }, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(apiUrl("/auth/signup"), {
        method: "POST",
        body: JSON.stringify({ name, username, email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      await dispatch(
        handleLogin({
          username,
          password,
        })
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  showPopup: false,
  loginWindow: false,
  signupWindow: false,
  userMenuSelected: false,
  currentUser: null,
  loading: false,
  error: false,
};

export const AuthSlice = createSlice({
  name: "AuthSlice",
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
    setUserMenuSelected: (state, action) => {
      state.userMenuSelected = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    handleLogout: (state) => {
      localStorage.removeItem("auth_token");
      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = false;
      state.userMenuSelected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(saveUserDetails.fulfilled, (state, action) => {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload,
        };
      });
  },
});

export const {
  setShowPopup,
  setLoginWindow,
  setIsLoggedIn,
  setSignupWindow,
  setUserMenuSelected,
  setCurrentUser,
  handleLogout,
} = AuthSlice.actions;
export default AuthSlice.reducer;
