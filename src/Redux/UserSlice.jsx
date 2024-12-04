import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../component/Api'; // Import Axios instance

const API_URL = 'http://localhost:5000';

export const signupUser = createAsyncThunk(
  'user/signup',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/signup', userCredentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const signinUser = createAsyncThunk(
  'user/signin',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/signin', userCredentials, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  userData: JSON.parse(localStorage.getItem('userData')) || null,
  error: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = null;
      state.error = null;
      localStorage.removeItem('userData');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload)); // Persist user data
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload)); // Persist user data
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = UserSlice.actions;
export const selectUserData = (state) => state.user.userData;
export default UserSlice.reducer;
