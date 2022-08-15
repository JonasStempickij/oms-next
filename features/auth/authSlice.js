import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  userId: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.userId = null;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = null;
    },
    checkUser: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userId = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.userId = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.userId = null;
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userId = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userId = null;
        state.errorMessage = action.payload;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.userId = null;
      });
  },
});

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (user, thunkAPI) => {
    try {
      return await authService.createUser(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await authService.loginUser(user);
      if (response.includes('auth/')) {
        return thunkAPI.rejectWithValue(response);
      } else {
        return response;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  'auth/signOut',
  async (_, thunkAPI) => {
    try {
      return await authService.signOutUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const { reset, checkUser } = authSlice.actions;
export default authSlice.reducer;
