import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    // Simulate API call
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            user: {
              id: '1',
              email: credentials.email,
              name: 'Demo User',
              role: 'user',
            },
            token: 'demo-token-123',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
    return response;
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData) => {
    // Simulate API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            role: 'user',
          },
          token: 'demo-token-123',
        });
      }, 1000);
    });
    return response;
  }
);

// Async thunk for admin login
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials) => {
    // Simulate API call
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'admin@stylon.com' && credentials.password === 'admin123') {
          resolve({
            user: {
              id: 'admin-1',
              email: credentials.email,
              name: 'Admin User',
              role: 'admin',
            },
            token: 'admin-demo-token-123',
          });
        } else {
          reject(new Error('Invalid admin credentials'));
        }
      }, 1000);
    });
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isAdmin: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.role === 'admin';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Signup User
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Admin Login
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.user.role === 'admin';
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
